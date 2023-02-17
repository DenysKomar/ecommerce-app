import { Alert } from "react-bootstrap";
interface IErrorBox {
  children: React.ReactNode;
  variant?: string;
}

const ErrorBox = ({ children, variant }: IErrorBox): JSX.Element => {
  return <Alert variant={variant || "info"}>{children}</Alert>;
};

export default ErrorBox;
