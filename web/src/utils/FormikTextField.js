import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const FormikTextField = props => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      sx={{
        margin: ".4rem 0"
      }}
      {...field}
      {...props}
      required
      autoComplete="off"
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default FormikTextField;
