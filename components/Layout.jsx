import Head from "next/head";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Blogsite</title>
      </Head>
      <HStack
        align="start"
        spacing="45px"
        minH="100vh"
        className="w-full h-[100%] bg-teal-50 "
      >
        <Sidebar />
        <VStack className="h-full w-full ">
          <Header />
          <Box w="100%">{children}</Box>
        </VStack>
      </HStack>
    </>
  );
};

export default Layout;
