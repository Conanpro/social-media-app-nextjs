import {
  VStack,
  Heading,
  Text,
  Divider,
  Avatar,
  HStack,
  // Textarea,
  Button,
  Tooltip,
  useClipboard
} from "@chakra-ui/react";
import ta from "time-ago";
import { FiShare } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import FavPost from "./FavPost";
import { GET_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const PostComp = ({ post }) => {
  const router = useRouter();
  const { loading, data } = useQuery(GET_ME);
  const { hasCopied, onCopy } = useClipboard(
    `https://t5j1wj.sse.codesandbox.io/${router.asPath}`
  );

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <VStack align="start" spacing={3} className="w-full max-w-4xl pr-20 pl-6">
        <Heading size="lg" className="mb-4 text-[#072D4B]">
          {post.title}
        </Heading>
        <Text className="text-[#072D4B] opacity-[85%] text-sm font-sans leading-normal">
          {post.content}
        </Text>
        <HStack spacing={4}>
          <Tooltip label="Save">
            <FavPost post={post} me={data?.me} />
          </Tooltip>
          <Tooltip
            closeOnClick={false}
            label={hasCopied ? "Copied to clipboard" : "Share"}
          >
            <Button
              as={motion.button}
              leftIcon={<FiShare />}
              size="sm"
              colorScheme="blue"
              variant="ghost"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              onClick={onCopy}
            >
              Share
            </Button>
          </Tooltip>
        </HStack>
        <Divider />

        <Text className="self-center text-[#072D4B] opacity-[75%] text-xs font-sans leading-normal">
          {ta.ago(post.createdAt)}
        </Text>

        <HStack pt={5} className="self-center" spacing={4}>
          <Avatar
            size="sm"
            name={post.author.username}
            src={post.author.avatar}
            className="self-center"
          />
          <Text
            mb={2}
            className="self-center text-[#072D4B] opacity-[95%] text-xs font-sans leading-normal"
          >
            Posted by <b>{post.author.username}</b>
          </Text>
        </HStack>

        {/* <VStack align="start" spacing={3} className="text-[#072D4B] w-full">
          <HStack w="full">
            <Heading size="xs" w="200px">
              Add your comment
            </Heading>
            <Divider flexGrow="1" />
          </HStack>
          <Textarea placeholder="Enter your comment here..." bg="cyan.50" />
          <Button colorScheme="blue">Post comment</Button>
        </VStack> */}
      </VStack>
    </>
  );
};

export default PostComp;
