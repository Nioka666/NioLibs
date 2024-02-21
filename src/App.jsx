import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useSWR from "swr";
import Dashboard from "./views/client/Dashboard";
import MainLayout from "./views/client/layouts/MainLayout";
import SignUp from "./views/client/SignUp";
import AuthLayout from "./views/client/layouts/AuthLayout";
import ErrorPage from "./views/client/components/ErrorPage";
import SignIn from "./views/client/SignIn";
import BookDetails from "./views/client/BookDetails";
import Borrowings from "./views/client/Borrowings";
import BackSignIn from "./views/backend/BackSignIn";
import AdminLayouts from "./views/backend/layouts/AdminLayouts";
import { AuthService } from "./utils/functions";
import { useEffect, useState } from "react";
import Profiles from "./views/client/Profiles";
import axios from "axios";
import { BACKEND_HOST } from "./utils/client_env";

function App() {
  const [isAdminSigned, setIsAdminSigned] = useState(false);

  const { data: adminSession } = useSWR("fetchUserSession", () =>
    axios
      .get(`${BACKEND_HOST}/api/admin-session`, { withCredentials: true })
      .then((response) => response.status)
  );

  useEffect(() => {
    if (adminSession === 200) {
      setIsAdminSigned(true);
    } else {
      setIsAdminSigned(false);
    }
  }, [adminSession]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="profile/">
              <Route path="user/:userID" element={<Profiles />} />
            </Route>
            <Route path="book/details/:bookID" element={<BookDetails />} />
            <Route path="book/borrowings/:bookID" element={<Borrowings />} />
          </Route>

          <Route path="/auth/" element={<AuthLayout />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="admin-portals" element={<BackSignIn />} />
          </Route>

          {isAdminSigned && (
            <Route path="/admin/" element={<AdminLayouts />}>
              <Route path="dashboard" element={<SignUp />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
