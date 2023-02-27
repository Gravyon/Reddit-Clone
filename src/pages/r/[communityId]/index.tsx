import { Community } from "@/atoms/communitiesAtom";
import Header from "@/components/Community/Header";
import CommunityNotFound from "@/components/Community/NotFound";
import PageContent from "@/components/Layout/PageContent";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log(communityData);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <div>Lefhand side</div>
        </>
        <>
          <div>Righthand side</div>
        </>
      </PageContent>
    </>
  );
};

// NextJS's way to pre-rendering the page with all the data
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
