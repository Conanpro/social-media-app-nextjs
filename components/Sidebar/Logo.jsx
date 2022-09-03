import { HStack, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Img from "../../public/logo.png";
import NextLink from "next/link";
import { motion } from "framer-motion";

const Logo = ({ isSmall }) => {
  return (
    <NextLink href="/">
      <HStack
        as={motion.div}
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.99
        }}
        spacing={4}
        className="mt-3 ml-4 mb-4 cursor-pointer"
      >
        <Image src={Img} height="40px" width="56px" />
        {!isSmall && <Heading size="md">Blogsite</Heading>}
      </HStack>
    </NextLink>
  );
};

export default Logo;
