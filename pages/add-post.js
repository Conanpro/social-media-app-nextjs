import {
  Button,
  Divider,
  Heading,
  HStack,
  Textarea,
  VStack,
  FormControl,
  FormErrorMessage,
  Text
} from "@chakra-ui/react";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../graphql/queries";
import { Field, Formik } from "formik";
import { PostSchema } from "../schemas";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";

const CreatePost = () => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const [addPost, { loading, error }] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      router.push(`/post/${data.postBlog.id}`);
    }
  });

  if (error) {
    return <p>Oops! Something went wrong</p>;
  }

  const onSubmit = (values) => {
    addPost({
      variables: values
    });
  };

  return (
    <>
      <Head>
        <title>Blogsite | CreatePost</title>
      </Head>
      <VStack align="start" className="w-full max-w-4xl pr-20 pl-6">
        <Heading size="md" className="mb-4 text-[#072D4B]">
          Create a Post
        </Heading>
        <Divider />
        <Formik
          initialValues={{
            title: "",
            content: ""
          }}
          validationSchema={PostSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched, dirty, isValid }) => (
            <VStack
              as="form"
              onSubmit={handleSubmit}
              align="start"
              spacing={3}
              className="text-[#072D4B] w-full"
            >
              <HStack w="full">
                <Heading size="xs" w="200px">
                  Post title
                </Heading>
                <Divider flexGrow="1" />
              </HStack>
              <FormControl isInvalid={!!errors.title && touched.title}>
                <Field
                  as={Textarea}
                  id="title"
                  name="title"
                  placeholder="Enter your title here..."
                  bg="cyan.50"
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <HStack w="full">
                <Heading size="xs" w="200px">
                  Post content
                </Heading>
                <Divider flexGrow="1" />
              </HStack>
              <FormControl isInvalid={!!errors.content && touched.content}>
                <Field
                  as={Textarea}
                  h="200px"
                  id="content"
                  name="content"
                  placeholder="Enter your content here..."
                  bg="cyan.50"
                />
                <FormErrorMessage>{errors.content}</FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="blue"
                type="submit"
                isDisabled={!dirty || !isValid || !isSignedIn()}
                isLoading={loading}
              >
                Post
              </Button>
              {!isSignedIn() && (
                <Text textColor="red">You must be signed in to post</Text>
              )}
            </VStack>
          )}
        </Formik>
      </VStack>
    </>
  );
};

export default CreatePost;
