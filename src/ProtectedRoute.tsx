import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useUser } from "./UserContext";
import LoadingPopup from "./Loading";

interface ProtectedRouteProps extends RouteProps {
  render: (props: any) => React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, ...rest }) => {
  const { user, loading } = useUser();
  console.log("Loading:", loading);

  if (loading) {
    return <LoadingPopup isOpen={true} />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          render(props) // Render the protected route if the user is authenticated
        ) : (
          <Redirect to="/folder/Login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
