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
import MyCollections from "./views/client/MyCollections";
import Borroweds from "./views/client/Histories";
import Histories from "./views/client/Histories";
import BorrowingStatus from "./views/client/BorrowingStatus";
import ReviewDialogue from "./views/client/components/ReviewDialogue";
import Statistics from "./views/backend/components/Statistics";
import OfficersList from "./views/backend/OfficersList";
import BorrowingsData from "./views/backend/BorrowingsData";
import MembersData from "./views/backend/MembersData";
import BooksList from "./views/backend/BooksList";
import BooksAdd from "./views/backend/BooksAdd";

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
              <Route
                path="user/:userID/collections"
                element={<MyCollections />}
              />

              <Route path="user/:userID/histories/" element={<Histories />}>
                <Route path="borrowings" element={<Borroweds />} />
                <Route path="book-returnings" element={<Borroweds />} />
              </Route>
            </Route>

            <Route path="book/details/:bookID" element={<BookDetails />} />
            <Route path="book/borrowings/:bookID" element={<Borrowings />} />
            <Route
              path="book/borrowings/:bookID/status"
              element={<BorrowingStatus />}
            />
            <Route
              path="book/borrowings/:bookID/review"
              element={<ReviewDialogue />}
            />
          </Route>

          <Route path="/auth/" element={<AuthLayout />}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="admin-portals" element={<BackSignIn />} />
          </Route>

          {isAdminSigned && (
            <Route path="/admin/" element={<AdminLayouts />}>
              <Route path="dashboard" element={<Statistics />} />
              <Route path="officers" element={<OfficersList />} />
              <Route path="officers-add" element={<OfficersList />} />
              <Route path="members-data" element={<MembersData />} />
              <Route path="books-list" element={<BooksList />} />
              <Route path="books-add" element={<BooksAdd />} />
              <Route path="borrowings-data" element={<BorrowingsData />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
