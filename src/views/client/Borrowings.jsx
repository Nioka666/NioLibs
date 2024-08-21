import useSWR from "swr";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { AuthService, BookService, UserActions } from "../../utils/functions";
import BasicTextField from "./components/BasicTextField";
import { coverPath } from "../../utils/client_env";
import SelectOptions from "./components/SelectOptions";

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
  const username = userSession?.username;

  const { data: bookDetails } = useSWR(
    "fetchBookDetail",
    () => BookService.findBookById(bookID),
    { revalidateOnFocus: false }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserActions.borrowingsBook(
        userID,
        bookID,
        username,
        loanTerm
      );
      // console.log(response);
      if (response?.status === 200) {
        setIsBorrowed(true);
        toast.success("Book Borrowed ..");
        console.log(response);
      } else if (response?.status !== 200) {
        setIsBorrowed(false);
        toast.error("Book Borrowed Failed ..");
        // throw new Error();
      }
    } catch (error) {
      setIsBorrowed(false);
      console.log(error);
    }

    // toast
    //   .promise(
    //     new Promise((resolve) =>
    //       setTimeout(() => resolve(callHandleSubmit()), 1500)
    //     ),
    //     {
    //       loading: "Loading...",
    //       success: "Sign In Successfully",
    //       error: "An error occurred during sign in",
    //     }
    //   )
    //   .then((result) => {
    //     if (result) {
    //       navigate(`/book/borrowings/${bookID}/status`);
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
              {/* <BasicTextField
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
              /> */}
              <div className="borrowing-inputs ms-2 d-grid gap-3">
                <div className="input-group input-group-lg flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div className="input-group input-group-lg flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Lengkap"
                    aria-label="Nama Lengkap"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div className="input-group input-group-lg flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Lengkap"
                    aria-label="Nama Lengkap"
                    aria-describedby="addon-wrapping"
                  />
                </div>
              </div>
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
