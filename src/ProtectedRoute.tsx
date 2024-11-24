import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useUser } from "./UserContext";
import LoadingPopup from "./Loading"; // Import your LoadingPopup component

interface ProtectedRouteProps extends RouteProps {
  render: (props: any) => React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, ...rest }) => {
  const { user, loading } = useUser();
  console.log("ProtectedRoute: User:", user, "Loading:", loading);

  if (loading) {
    return <LoadingPopup isOpen={true} />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          render(props) // Execute render prop
        ) : (
          <Redirect to="/folder/Login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
