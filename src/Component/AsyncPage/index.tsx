import React from "react";
import { Loading, ErrorBoundary } from "..";
import { Spinner } from "@chakra-ui/react";
interface AsyncPageProps {
  page: string;
  fallback?: JSX.Element;
  loading?: boolean;
}

const AsyncPage: React.FC<AsyncPageProps> = (props) => {
  const Component = React.lazy(() => import(`../../pages/${props.page}`));

  const fallback = <Loading />;

  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        <div style={{ display: "flex", justifyContent: "center", }}>
          {props.loading ? <Spinner mt={'50vh'} size={'lg'} /> : <Component />}
        </div>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AsyncPage;
