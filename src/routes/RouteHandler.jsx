import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const RouteHandler = ({ route }) => {
  const { isProtected, allowedRoles, page: PageComponent } = route;

  // If the route is protected, use ProtectedRoute to wrap the component
  if (isProtected) {
    return (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <PageComponent />
      </ProtectedRoute>
    );
  }

  // If not protected, just return the PageComponent
  return <PageComponent />;
};

export default RouteHandler;
