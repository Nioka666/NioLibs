import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { AuthService, BookService, UserActions } from "../../utils/functions";
import BasicTextField from "./components/BasicTextField";
import { coverPath } from "../../utils/client_env";
import React, { useState } from "react";
import SelectOptions from "./components/SelectOptions";
import toast, { Toaster } from "react-hot-toast";

function Borrowings() {
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [loanTerm, setLoanTerm] = React.useState("");
  const handleSelectChange = (event) => {
    setLoanTerm(event.target.value);
  };
  const navigate = useNavigate();
  const { bookID } = useParams();
  const { data: userSession, isValidating: userDetailoading } = useSWR(
    "fetchUserSession",
    () => AuthService.checkUserSession()
  );
  const userID = userSession?._id;
  const { data: bookDetails } = useSWR(
    "fetchBookDetail",
    () => BookService.findBookById(bookID),
    { revalidateOnFocus: false }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await UserActions.borrowingsBook(userID, bookID, loanTerm);
    if (response?.status === 200) {
      setIsBorrowed(true);
      await toast.promise(
        new Promise((resolve) => {
          setTimeout(() => resolve(response), 2000);
        }),
        {
          loading: "Loading...",
          success: "Sign In Successfully",
          error: "An error occurred during sign in",
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else if (response?.status !== 200) {
      setIsBorrowed(false);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    navigate(`/book/details/${bookID}`);
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#fffff",
            color: "black",
          },

          success: {
            duration: 2500,
          },

          error: {
            duration: 2500,
          },
        }}
      />
      <div className="container mt-4 d-flex niolibs-borrowing-container">
        <section className="borrowing-detail">
          <h3 className="fw-bold">Borrowing Details</h3>
          <h6 className="text-gray fw-normal">
            Contains user details and also following by other
          </h6>
          <div className="form-wrapper w-50">
            <form className="borrowing-form" onSubmit={handleSubmit}>
              <BasicTextField
                value={userSession?.username}
                type={"text"}
                placeholder={"username"}
              />
              <BasicTextField
                value={userSession?.nama_lengkap}
                type={"text"}
                placeholder={"Nama Lengkap"}
              />
              <BasicTextField
                value={userSession?.email}
                type={"email"}
                placeholder={"email"}
              />
              <SelectOptions
                selectedValue={loanTerm}
                handleChange={handleSelectChange}
              />
              <div className="btn-group">
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </section>

        <section className="borrowing-books mt-1">
          <h3 className="fw-bold">Book Selected</h3>
          <h6 className="text-gray fw-normal">
            Contains user details and bookwing by other
          </h6>
          <div className="book-selected">
            <img src={`${coverPath}/${bookDetails?.cover}`} alt="" />
            <div className="descriptions">
              <h6 className="fw-bold d-grid gap-2">
                Title
                <span className="text-gray fw-semibold">
                  {bookDetails?.judul}
                </span>
              </h6>
              <h6 className="fw-bold d-grid gap-2">
                Author
                <span className="text-gray fw-semibold">
                  {bookDetails?.penulis}
                </span>
              </h6>
              <h6 className="fw-bold d-grid gap-2">
                Stock
                <span className="text-gray fw-semibold">
                  {bookDetails?.stok}
                </span>
              </h6>
              <h6 className="fw-bold d-grid gap-2">
                Publisher
                <span className="text-gray fw-semibold">
                  {bookDetails?.penerbit}
                </span>
              </h6>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Borrowings;
