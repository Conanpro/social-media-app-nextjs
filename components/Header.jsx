import { useQuery } from "@apollo/client";
import {
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Avatar,
  useDisclosure,
  Show
} from "@chakra-ui/react";
import { FiLogIn, FiSearch, FiUserPlus } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { getMe } from "../graphql/queries";
import { useAuth } from "../context/authContext";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const { isSignedIn: isUserSignedIn, signOut } = useAuth();

  const [isSignedIn, setIsSignedIn] = useState(isUserSignedIn());

  const { data, loading, error } = useQuery(getMe, {
    skip: !isSignedIn
  });

  if (error) {
    setIsSignedIn(false);
  }

  return (
    <HStack
      justify="space-between"
      spacing="12"
      className="w-full h-[76px] sticky top-0 bg-sky-50 z-10"
      mr={8}
    >
      <Input
        w="80%"
        maxW="700px"
        placeholder="Search posts"
        isDisabled
        backgroundColor="#2F9FF80A"
        borderColor="rgba(0%, 0%, 100%, 0)"
      />
      <Menu onOpen={onOpen} onClose={onClose}>
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
            <Show breakpoint="(min-width: 1035px)">
              <Text className="w-[80px]">
                {isSignedIn && !loading ? data?.me?.username : "My Profile"}
              </Text>
              <Icon as={FiChevronDown} className={isOpen && "rotate-180"} />
            </Show>
          </HStack>
        </MenuButton>
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
    </HStack>
  );
};
export default Header;
