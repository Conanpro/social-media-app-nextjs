import { useQuery } from "@apollo/client";
import { GET_MY_FAVORITES } from "../graphql/queries";
import Feed from "../components/Feed";
import Head from "next/head";

const Saved = () => {
  const { fetchMore, error } = useQuery(GET_MY_FAVORITES);
  console.log(fetchMore, error);
  const fetchPosts = (args) => {
    return new Promise((resolve) => {
      fetchMore(args)
        .then((data) => {
          resolve(data.data.me.favorites);
        })
        .catch(() => {});
    });
  };

  if (error) return <p>Sign in to see saved posts</p>;

  return (
    <>
      <Head>
        <title>Blogsite | Saved Posts</title>
      </Head>
      <Feed fetchMore={fetchPosts} />
    </>
  );
};

export default Saved;
