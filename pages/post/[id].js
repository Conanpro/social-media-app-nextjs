import { GET_BLOG } from "../../graphql/queries";
import client from "../../apollo-client";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import PostComp from "../../components/PostComp";

const Post = ({ post }) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: { id: router.query.id }
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return <PostComp post={data.getBlog} />;
};

export default Post;
