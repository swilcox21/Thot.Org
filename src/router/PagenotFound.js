/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";

function PageNotFound() {
  const loading = false;
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <div className="container" style={{ textAlign: "center" }}>
              <h1 style={{ paddingTop: "100px" }}>404 Page Not Found</h1>
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default PageNotFound;
// vercel
