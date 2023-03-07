import { communityState } from "@/atoms/communitiesAtom";
import { Post, postState, PostVote } from "@/atoms/postAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);
  const currentCommunity = useRecoilValue(communityState).currentCommunity;

  const onVote = async (post: Post, vote: number, communityId: string) => {
    // check for user, if not open auth modal
    try {
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );

      const batch = writeBatch(firestore);
      // copies of the current state values
      // since every these 3 things will need to be modified
      // this allows us to modify the copies instead of the true state
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      // vote amount
      let voteChange = vote;

      // new vote
      if (!existingVote) {
        // create new postVote doc
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote, // 1 or -1
        };

        batch.set(postVoteRef, newVote);

        // add or substract 1 to/from post.voteStatus
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      }
      // vote exists, they voted before
      else {
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );
        // removing vote, they remove their vote (neutral)
        if (existingVote.voteValue === vote) {
          // add or substract 1 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          // delete the postVote doc
          batch.delete(postVoteRef);

          voteChange *= -1;
        }
        // they change their vote to a negative or positive
        else {
          // add or substract 2 to/from post.voteStatus
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIndex = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };
          // update postVote doc
          batch.update(postVoteRef, { voteValue: vote });
          voteChange = 2 * vote;
        }
      }
      // update post doc
      // ! is needed to typescript knows post.id is a valid
      const postRef = doc(firestore, "posts", post.id!);
      batch.update(postRef, {
        voteStatus: voteStatus + voteChange,
      });
      // update state with updated values
      // writes the changes
      await batch.commit();

      const postIndex = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPosts[postIndex] = updatedPost;

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));
    } catch (error: any) {
      console.log("onVote error", error.message);
    }
  };

  const onSelectPost = () => {};
  // in here, typescript wants to know the parameter type and the return type
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // check if post has image attached, delete image if it exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // delete post doc
      // ! is needed here because id is optional
      const postRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postRef);
      // update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error: any) {
      console.log("onDeletePost error", error.message);
      return false;
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );
    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc,
      ...doc.data(),
    }));
    setPostStateValue((prev) => ({
      ...prev,
      // typescript wants this syntax for whatever reason
      postVotes: postVotes as unknown as PostVote[],
    }));
  };

  useEffect(
    () => {
      // guard to check for current community and user
      if (!user || !currentCommunity?.id) return;
      getCommunityPostVotes(currentCommunity?.id);
    },
    // dependency so it only updates if this exists
    [user, currentCommunity]
  );

  useEffect(() => {
    if (!user) {
      // clear user post votes
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
