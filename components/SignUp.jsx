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
  FormErrorMessage,
  useToast,
  Icon,
  InputRightElement,
  InputGroup
} from "@chakra-ui/react";
import { useAuth } from "../context/authContext";
import { Field, Formik } from "formik";
import { SignupSchema } from "../schemas";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignUpMutation } from "../graphql/queries";

const SignUp = ({ initialRef, isOpen, onOpenT, onClose }) => {
  const { setAuthToken } = useAuth();

  const [signUp, { loading }] = useMutation(SignUpMutation);

  const toast = useToast();

  const onSubmit = (values) => {
    signUp({ variables: values })
      .then((data) => {
        setAuthToken(data.data.signUp);
        toast({
          title: "Account created",
          status: "success",
          duration: 3000,
          variant: "left-accent",
          isClosable: true
        });
      })
      .catch((e) => {
        toast({
          title: "Error creating account",
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
            username: "",
            email: "",
            password: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched, dirty, isValid }) => (
            <ModalContent as="form" onSubmit={handleSubmit}>
              <ModalHeader>Sign Up</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username" ref={initialRef}>
                    Username
                  </FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="username"
                    placeholder="Username"
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!errors.email && touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
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
                  Alredy have an account?{" "}
                  <Link
                    onMouseDown={() => {
                      onClose();
                      onOpenT();
                    }}
                    color="blue.500"
                  >
                    Log In
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
                  Sign Up
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default SignUp;
