import { Post, postState } from "@/atoms/postAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
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

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
