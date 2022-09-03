import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required")
    .max(50, "Email is too long"),
  password: yup
    .string()
    .min(4, "Password should be over 3 characters")
    .max(35, "Password is too long")
    .required("This field is required")
});

export const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required")
    .max(50, "Email is too long"),
  password: yup
    .string()
    .min(4, "Password should be over 3 characters")
    .required("This field is required")
    .max(35, "Password is too long"),
  username: yup
    .string()
    .required("This field is required")
    .matches(/\w/, "Please enter a valid username")
    .max(25, "Username is too long")
});

export const PostSchema = yup.object().shape({
  title: yup
    .string()
    .min(4, "Title should be over 3 characters long")
    .required("A title is required")
    .max(50, "Title is too long"),
  content: yup
    .string()
    .required("Post content is required")
    .min(3, "Content should be over 2 characters long")
    .max(400, "You've reached the character limit")
});
