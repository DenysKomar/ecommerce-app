import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <p>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </p>
      <p>
        <Link className="nav-link" to="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
