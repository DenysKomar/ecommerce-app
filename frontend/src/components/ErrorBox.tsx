import React from "react";
import { Alert } from "react-bootstrap";

const ErrorBox = (props: any) => {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
};

export default ErrorBox;
