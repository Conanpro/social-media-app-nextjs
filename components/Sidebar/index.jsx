import {
  VStack,
  Text,
  HStack,
  Icon,
  Box,
  useBreakpointValue,
  Divider,
  MenuList,
  MenuItem,
  Show,
  useDisclosure,
  Menu,
  MenuButton,
  Button,
  Avatar,
  Hide
} from "@chakra-ui/react";
import {
  FiHome,
  FiFeather,
  FiPlus,
  FiUser,
  FiChevronDown,
  FiLogOut,
  FiLogIn,
  FiUserPlus
} from "react-icons/fi";
import { TbBookmarks } from "react-icons/tb";
import { IoEllipse } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";
import { useQuery } from "@apollo/client";
import { getMe } from "../../graphql/queries";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

const Sidebar = () => {
  const isSmall = useBreakpointValue({
    base: true,
    md: false
  });
  const router = useRouter();
  const [hovered, setHovered] = useState(undefined);

  const [selected, setSelected] = useState(router.pathname);

  if (selected === "/post/[id]") {
    setSelected("/");
  }

  const menus = [
    { title: "Home", src: "/", icon: FiHome, size: "24px" },
    {
      title: "Saved",
      src: "/saved",
      icon: TbBookmarks,
      spacing: "18px",
      size: "27px"
    },
    {
      title: "My Posts",
      src: "/my-posts",
      icon: FiFeather,
      size: "24px",
      space: true
    },
    {
      title: "Create",
      src: "/add-post",
      icon: FiPlus,
      size: "24px",
      space: true
    }
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isSignedIn: isUserSignedIn, signOut } = useAuth();

  const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());

  const { data, loading, error } = useQuery(getMe, {
    skip: !isSignedIn
  });

  if (error) {
    setIsSignedIn(false);
  }

  const {
    isOpen: isSUOpen,
    onOpen: onSUOpen,
    onClose: onSUClose
  } = useDisclosure();

  const {
    isOpen: isSIOpen,
    onOpen: onSIOpen,
    onClose: onSIClose
  } = useDisclosure();

  const initialSURef = useRef(null);
  const initialSIRef = useRef(null);

  useEffect(() => {
    if (router.pathname === "/post/[id]") {
      return;
    }
    setSelected(router.pathname);
  }, [router.pathname]);

  return (
    <Hide below="sm">
      <VStack
        align="start"
        minW={{ base: "95px", md: "220px", xl: "260px" }}
        borderRightColor="gray.100"
        borderRightWidth={2}
        className="pt-2 pb-6 sticky top-0 "
      >
        <Logo isSmall={isSmall} />
        {menus.map((menu, index) => (
          <Box key={index}>
            <NextLink href={menu.src}>
              <Box
                key={index}
                w={{ base: "95px", md: "200px", xl: "235px" }}
                className="h-[50px] relative rounded-r-full"
                onMouseEnter={() => {
                  setHovered(index + 1);
                }}
                onMouseLeave={() => {
                  setHovered(undefined);
                }}
                onClick={() => {
                  setSelected(menu.src);
                }}
              >
                <AnimatePresence>
                  {hovered === index + 1 && !isSmall && (
                    <Box
                      as={motion.div}
                      initial={{
                        width: 0,
                        opacity: 1
                      }}
                      animate={{
                        width: "100%",
                        opacity: 1
                      }}
                      exit={{
                        width: 0,
                        opacity: 0
                      }}
                      className="bg-[#2F9FF8]/[0.1] absolute h-full top-0 left-0 rounded-r-full"
                    ></Box>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {selected === menu.src && !isSmall && (
                    <Box
                      as={motion.div}
                      initial={{
                        width: 0,
                        opacity: 1
                      }}
                      animate={{
                        width: "100%",
                        opacity: 1
                      }}
                      exit={{
                        width: 0,
                        opacity: 0
                      }}
                      className="bg-[#2F9FF8]/[0.15] absolute h-full top-0 left-0 rounded-r-full"
                    ></Box>
                  )}
                </AnimatePresence>
                {selected === menu.src ? (
                  <HStack
                    as={motion.div}
                    className="pl-[15px] relative cursor-pointer h-full w-full text-blue-800"
                    justify="start"
                    whileTap={{ scale: 0.95, color: "#2F9FF8" }}
                    spacing={menu?.spacing || "22px"}
                  >
                    <HStack
                      as={motion.div}
                      whileHover={{ scale: 1.1 }}
                      spacing="12px"
                    >
                      <Icon as={IoEllipse} boxSize="8px" color="#2F9FF8" />
                      <Icon
                        as={menu.icon}
                        boxSize={menu.size}
                        color="#2F9FF8"
                      />
                    </HStack>
                    {!isSmall && (
                      <Text as={motion.p} className="text-[#2F9FF8] font-bold">
                        {menu.title}
                      </Text>
                    )}
                  </HStack>
                ) : (
                  <HStack
                    as={motion.div}
                    className="pl-[35px] relative cursor-pointer h-full w-full"
                    justify="start"
                    spacing={menu?.spacing || "22px"}
                    whileHover={isSmall && { scale: 1.1 }}
                    whileTap={{ scale: 0.95, color: "#2F9FF8" }}
                  >
                    <Icon as={menu.icon} color="#072D4B" boxSize={menu.size} />
                    {!isSmall && (
                      <Text as={motion.p} textColor="#072D4B" fontWeight="500">
                        {menu.title}
                      </Text>
                    )}
                  </HStack>
                )}
              </Box>
            </NextLink>
            {menu.space && <Divider mt={4} />}
          </Box>
        ))}
        <Menu onOpen={onOpen} onClose={onClose} w="100%">
          <VStack w="100%" h="100%">
            <MenuButton variant="ghost" h={50} as={Button}>
              <HStack spacing="3">
                {isSignedIn && !loading ? (
                  <Avatar
                    size="sm"
                    name={data?.me?.username}
                    src={data?.me?.avatar}
                  />
                ) : (
                  <Icon as={FiUser} h="5" w="5" />
                )}
                <Show breakpoint="(min-width: 770px)">
                  <Text className="w-[80px]">
                    {isSignedIn && !loading ? data?.me?.username : "My Profile"}
                  </Text>
                  <Icon as={FiChevronDown} className={isOpen && "rotate-180"} />
                </Show>
              </HStack>
            </MenuButton>
          </VStack>
          <MenuList>
            {isSignedIn && !loading ? (
              <MenuItem onClick={() => signOut()} icon={<Icon as={FiLogOut} />}>
                Log Out
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={onSIOpen} icon={<Icon as={FiLogIn} />}>
                  Log In
                </MenuItem>
                <MenuItem onClick={onSUOpen} icon={<Icon as={FiUserPlus} />}>
                  Sign Up
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
        <SignIn
          isOpen={isSIOpen}
          onOpen={onSIOpen}
          initialRef={initialSIRef}
          onClose={onSIClose}
        />
        <SignUp
          isOpen={isSUOpen}
          onOpenT={onSIOpen}
          initialRef={initialSURef}
          onClose={onSUClose}
        />
      </VStack>
    </Hide>
  );
};

export default Sidebar;
