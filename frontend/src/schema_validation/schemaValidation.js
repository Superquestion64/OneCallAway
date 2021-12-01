import * as yup from "yup";

export const registerationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Username is too short!")
    .required("Username is required!"),
  email: yup
    .string()
    .lowercase()
    .email("Email is not valid")
    .required("Email is required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password be at least 8 characters longs, contains at least one lowercase charater, one uppercase character, one digit and one special character"
    )
    .required("Password is required!"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Passwords do not match.")
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .lowercase()
    .email("Email is not valid")
    .required("Email is required!"),
  password: yup.string().required("Password is required!")
});

export const profileSchema = yup.object({
  email: yup
    .string()
    .lowercase()
    .email("Email is not valid")
    .required("Email is required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password be at least 8 characters longs, contains at least one lowercase charater, one uppercase character, one digit and one special character"
    )
    .required("Password is required!")
});
