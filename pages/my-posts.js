import { useQuery } from "@apollo/client";
import { GET_MY_BLOGS } from "../graphql/queries";
import Feed from "../components/Feed";
import Head from "next/head";

const MyPosts = () => {
  const { fetchMore, error } = useQuery(GET_MY_BLOGS);

  const fetchPosts = (args) => {
    return new Promise((resolve) => {
      fetchMore(args)
        .then((data) => {
          resolve(data.data.me.blogFeed);
        })
        .catch(() => {});
    });
  };

  if (error) return <p>You must be signed in to view your own posts</p>;

  return (
    <>
      <Head>
        <title>Blogsite | My Posts</title>
      </Head>
      <Feed fetchMore={fetchPosts} />
    </>
  );
};

export default MyPosts;
