import {
  VStack,
  SimpleGrid,
  Heading,
  Divider,
  Text,
  useToast
} from "@chakra-ui/react";
import Post from "../components/Post";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";

const Feed = ({ fetchMore }) => {
  const [blogs, setBlogs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [hasNextPage, setHasNextPage] = useState(true);

  const [noBlogs, setNoBlogs] = useState(false);

  const observer = useRef();
  const lastBlogElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage === true) {
          setIsLoading(true);
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [blogs]
  );

  useEffect(() => {
    fetchMore({
      variables: {
        page
      }
    }).then((blogFeed) => {
      if (blogFeed.blogs[0] === undefined) {
        setNoBlogs(true);
        setIsLoading(false);
        return;
      }
      if (
        blogFeed?.blogs[blogFeed?.blogs?.length - 1]?.id ===
        blogs[blogs?.length - 1]?.id
      ) {
        console.log(9);
        return setBlogs(blogs);
      }
      if (
        blogFeed?.blogs[blogFeed?.blogs?.length - 1] ===
        blogs[blogs?.length - 1]
      ) {
        setHasNextPage(false);
      }
      if (blogFeed?.blogs?.length < 10) {
        setHasNextPage(false);
      } else if (hasNextPage === false) {
        setHasNextPage(true);
      }
      setBlogs([...blogs, ...blogFeed?.blogs]);
      setIsLoading(false);
    });
  }, [page]);

  if (noBlogs) {
    return <p>No Posts</p>;
  }

  return (
    <VStack align="start" className="w-full max-w-4xl pr-20 pl-6">
      <Heading size="md" className="mb-4 text-[#072D4B]">
        Top Stories for you
      </Heading>
      <Divider />
      <SimpleGrid
        marginBottom={20}
        className="w-full"
        columns={{ base: 1, lg: 2 }}
        spacing={10}
      >
        {blogs.map((post) => (
          <Post reference={lastBlogElementRef} key={post.id} post={post} />
        ))}
      </SimpleGrid>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>You've reached the end</Text>
      )}
    </VStack>
  );
};

export default Feed;
