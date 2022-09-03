import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../graphql/queries";
import Feed from "../components/Feed";

const Home = () => {
  const { fetchMore, error, loading } = useQuery(GET_BLOGS);

  const fetchPosts = (args) => {
    return new Promise((resolve) => {
      fetchMore(args)
        .then((data) => {
          resolve(data.data.blogFeed);
        })
        .catch(() => {});
    });
  };

  if (loading) return <p>Loading posts</p>;
  if (error) return <p>Error loading posts</p>;
  if (error) {console.log(error)}

  return <Feed fetchMore={fetchPosts} />;
};

export default Home;
