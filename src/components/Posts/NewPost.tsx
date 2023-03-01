import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostProps = {
  user: User;
};

const formTabs: TabItem[] = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images & Video", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPost: React.FC<NewPostProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({ title: "", body: "" });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;

    // create new post => type Post
    const newPost: Post = {
      // typecasted here because we know it's going to be a string always
      communityId: communityId as string,
      creatorId: user.uid,
      // user.email! is needed telling typscript that there is always going to be an user
      // because the form itself only shows up when there is an user
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      // typecasted here since this function is only available on firestore servers
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      // store post in db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      if (selectedFile) {
        // check if there's a file => store file getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        //update post doc with the image/file
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }
    } catch (error: any) {
      console.log("CreatePost error", error.message);
    }
    setLoading(false);
    //redirect user back to community page
    // router.back();
  };

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        // typecasted just in case, since this will always take one value of type string
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction="column" background="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((tab) => (
          <TabItem
            key={tab.title}
            tab={tab}
            selected={tab.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onTextChange={onTextChange}
            loading={loading}
            handleCreatePost={handleCreatePost}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default NewPost;
