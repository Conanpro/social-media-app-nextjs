import {
  Container,
  Text,
  HStack,
  Avatar,
  Flex,
  VStack
} from "@chakra-ui/react";
import ta from "time-ago";
import FavPost from "./FavPost";
import { GET_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const Post = ({ post, reference }) => {
  const { loading, data } = useQuery(GET_ME);
  const controls = useAnimation();

  if (loading) return <p>Loading...</p>;

  return (
    <Link href={`/post/${post.id}`}>
      <Container
        as={motion.div}
        px="23px"
        bg="white"
        maxH="193px"
        className="select-none cursor-pointer py-[15px] mt-4 rounded-md outline-5 shadow-lg shadow-cyan-100"
        ref={reference}
        whileHover={{ scale: 1.03 }}
        onClick={() => {
          controls.start({
            scale: 1
          });
        }}
        animate={controls}
      >
        <Flex direction="column" h="full" justify="space-between">
          <VStack
            align="start"
            spacing="9px"
            maxH="130px"
            className=" overflow-hidden"
          >
            <Text
              noOfLines={2}
              className="text-[#072D4B] font-medium font-sans text-lg leading-6"
            >
              {post.title}
            </Text>
            <Text
              noOfLines={3}
              className="text-[#072D4B] opacity-[85%] text-sm font-sans leading-normal"
            >
              {post.content}
            </Text>
          </VStack>
          <HStack justify="space-between" pt="12px">
            <HStack>
              <Avatar
                size="xs"
                name={post.author.username}
                src={post.author.avatar}
              />
              <Text className="text-xs leading-loose text-[#072D4B] opacity-60">
                {post.author.username}
              </Text>
              <Text className="opacity-60">·</Text>
              <Text className="text-xs leading-loose text-[#072D4B] opacity-60">
                {ta.ago(post.createdAt)}
              </Text>
            </HStack>
            <FavPost me={data?.me} post={post} />
          </HStack>
        </Flex>
      </Container>
    </Link>
  );
};

export default Post;
