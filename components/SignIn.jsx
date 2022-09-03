import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  useDisclosure,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
  Icon
} from "@chakra-ui/react";
import SignUp from "./SignUp";
import { useAuth } from "../context/authContext";
import { Field, Formik } from "formik";
import { LoginSchema } from "../schemas";
import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LoginMutation } from "../graphql/queries";

const SignIn = ({ initialRef, isOpen, onOpen, onClose }) => {
  const toast = useToast();

  const [signIn, { loading }] = useMutation(LoginMutation);

  const { setAuthToken } = useAuth();

  const {
    isOpen: isOpenT,
    onOpen: onOpenT,
    onClose: onCloseT
  } = useDisclosure();

  const initialRefT = useRef(null);

  const onSubmit = (values) => {
    signIn({ variables: values })
      .then((data) => {
        setAuthToken(data.data.signIn);
        onClose();
        toast({
          title: "Logged in successfully",
          status: "success",
          duration: 3000,
          variant: "left-accent",
          isClosable: true
        });
      })
      .catch((e) => {
        toast({
          title: "Error logging in",
          description: e.message,
          status: "error",
          duration: 3000,
          variant: "left-accent",
          isClosable: true
        });
      });
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched, dirty, isValid }) => (
            <ModalContent as="form" onSubmit={handleSubmit}>
              <ModalHeader>Sign In</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <FormControl isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email" ref={initialRef}>
                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt={4}
                  isInvalid={!!errors.password && touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        w="2rem"
                        onClick={() => setShow(!show)}
                        variant="ghost"
                      >
                        {show ? <Icon as={FiEye} /> : <Icon as={FiEyeOff} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Text mt={6} className="text-sm">
                  Dont have an account?{" "}
                  <Link
                    onMouseDown={() => {
                      onClose();
                      onOpenT();
                    }}
                    color="blue.500"
                  >
                    Sign Up
                  </Link>
                </Text>
              </ModalBody>

              <ModalFooter mb={2}>
                <Button
                  type="submit"
                  colorScheme="teal"
                  w="full"
                  isDisabled={!dirty || !isValid}
                  isLoading={loading}
                >
                  Log In
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Formik>
      </Modal>
      <SignUp
        initialRef={initialRefT}
        onClose={onCloseT}
        isOpen={isOpenT}
        onOpenT={onOpen}
      />
    </>
  );
};

export default SignIn;
