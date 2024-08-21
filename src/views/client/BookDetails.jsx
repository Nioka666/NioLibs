import { useParams, useNavigate, Link } from "react-router-dom";
import useSWR from "swr";
import { AuthService, BookService, UserActions } from "../../utils/functions";
import SmallCatalogue from "./components/SmallCatalogue";
import Ratings from "./components/Ratings";
import toast, { Toaster } from "react-hot-toast";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";

function BookDetails() {
  const navigate = useNavigate();
  const [isCollectionAdded, setIsCollectionAdded] = useState(false);
  const { bookID } = useParams();
  const coverPath = "/cover_books/";

  const { data: bookData } = useSWR(
    "findBookById",
    () => BookService.findBookById(bookID),
    { revalidateOnFocus: false }
  );

  const { data: userSession } = useSWR(
    "userSession",
    () => AuthService.checkUserSession(),
    { revalidateOnFocus: true }
  );
  const userID = userSession?._id;
  const bookTitle = bookData?.judul;
  const bookAuthor = bookData?.penulis;
  const bookCover = bookData?.cover;

  const handleBorrowClick = () => {
    navigate(`/book/borrowings/${bookID}`);
  };

  const handleAddCollection = async () => {
    const callAddCollection = async () => {
      try {
        const response = await UserActions.savingsBook(
          userID,
          bookID,
          bookTitle,
          bookAuthor,
          bookCover
        );
        if (response?.status === 200) {
          setIsCollectionAdded(true);
          console.log(response);
          return response;
        } else {
          setIsCollectionAdded(false);
          throw new Error("Can't added book to collection");
        }
      } catch (error) {
        setIsCollectionAdded(false);
        console.log(error);
      }
    };

    toast
      .promise(
        new Promise((resolve) =>
          setTimeout(() => resolve(callAddCollection()), 1500)
        ),
        {
          loading: "Loading...",
          success: "Added Success",
          error: "An error occurred during sign in",
        }
      )
      .then((result) => {
        if (result) {
          console.info("success");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
      <div className="container book-detail-container">
        <section className="cover-book">
          <img src={`${coverPath}/${bookData?.cover}`} alt="" />
        </section>
        <section className="description-book">
          <h4 className="text-gray">
            {bookData?.penulis} - {bookData?.tahun_terbit}
          </h4>
          <div className="d-flex w-75">
            <h2 className="fw-bold">{bookData?.judul}</h2>
          </div>
          <Ratings top={"5px"} left={"0px"} />

          <div className="content-desc d-flex gap-5">
            <div className="desc w-50">
              <h5 className="mt-3">
                <b>Book Description</b>
              </h5>
              <h6
                className="text-gray fw-normal mt-2"
                style={{ lineHeight: "145%" }}
              >
                {bookData?.deskripsi}
              </h6>
            </div>

            <div className="desc w-25">
              <h5 className="mt-3">
                <b>Details</b>
              </h5>
              <div className="d-flex justify-content-sm-between">
                <h6 className="mt-2 text-gray">Release Year</h6>
                <h6 className="mt-2 text-gray">{bookData?.tahun_terbit}</h6>
              </div>
              <div className="d-flex justify-content-sm-between">
                <h6 className="mt-2 text-gray">Author</h6>
                <h6 className="mt-2 text-gray">{bookData?.penulis}</h6>
              </div>
              <div className="d-flex justify-content-sm-between">
                <h6 className="mt-2 text-gray">Publisher</h6>
                <h6 className="mt-2 text-gray">{bookData?.penerbit}</h6>
              </div>
            </div>
          </div>

          <div className="btn-group d-flex gap-3">
            <Link reloadDocument to={`/book/borrowings/${bookID}`}>
              <button className="bg-white text-ijo">Borrow</button>
            </Link>
            <button className="bg-ijo-muda" onClick={handleAddCollection}>
              Add to Collection
            </button>
          </div>
        </section>
      </div>
      <Reviews />
      <SmallCatalogue />
    </>
  );
}

export default BookDetails;
