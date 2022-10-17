import React from "react";
import { Loading, ErrorBoundary } from "..";
import { Spinner, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface AsyncPageProps {
  page: string;
  fallback?: JSX.Element;
  loading?: boolean;
}

const AsyncPage: React.FC<AsyncPageProps> = (props) => {
  const Component = React.lazy(() => import(`../../pages/${props.page}`));

  const history = useNavigate();

  return (
    <ErrorBoundary>
      <React.Suspense>
        {props.page && (
          <Box p={5}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ fontSize: 20 }}
              onClick={() => history(-1)}
            />
          </Box>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {props.loading ? <Spinner mt={"50vh"} size={"lg"} /> : <Component />}
        </div>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AsyncPage;
