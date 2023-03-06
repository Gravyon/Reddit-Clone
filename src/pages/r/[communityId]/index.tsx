import { Community, communityState } from "@/atoms/communitiesAtom";
import About from "@/components/Community/About";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import CommunityNotFound from "@/components/Community/NotFound";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  // console.log(communityData);
  const setCommunityStateValue = useSetRecoilState(communityState);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

// NextJS's way for pre-rendering the page with all the data
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and paste to out client component
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      // context.query.communityId is always going to be the same as the route ([communityId])
      // since it's always going to be a string, we can just type cast it as string
      context.query.communityId as string
    );
    // firebase
    const communityDoc = await getDoc(communityDocRef);
    // this is how NextJs passes the props with the data inside, coming from communityDoc
    return {
      // this is a workaround because simply doing "communityData: communityDoc.data()" will cause NextJs to not know how to serialize the data, the timestamp to be exact
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // NextJs also provides a way to give an error page instead of a simple error
    console.log("getServerSideProps", error);
  }
}

export default CommunityPage;
