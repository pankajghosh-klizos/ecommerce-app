import { Container } from "../components";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  const navigate = useNavigate();
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="py-5 text-center">
        <h1 className="display-1 fw-semibold lh-1 mb-4">
          404{" "}
          <span className="d-block lh-1 fw-light display-3">
            {error.statusText ||
              "Something went wrong. Please try again later."}
          </span>
        </h1>
        <button
          type="button"
          className="btn btn-dark btn-lg"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </Container>
  );
};

export default ErrorPage;
