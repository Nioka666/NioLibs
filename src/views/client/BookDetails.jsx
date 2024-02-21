import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AuthService, BookService, UserActions } from "../../utils/functions";
import SmallCatalogue from "./components/SmallCatalogue";
import Ratings from "./components/Ratings";
import Reviews from "./Reviews";

function BookDetails() {
  const navigate = useNavigate();
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
  const usereID = userSession?._id;

  const handleBorrowClick = () => {
    navigate(`/book/borrowings/${bookID}`);
  };

  const handleAddCollection = async () => {
    try {
      const response = await UserActions.savingsBook(usereID, bookID);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              <h6 className="text-gray fw-normal mt-2">
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
                <h6 className="mt-2 text-gray">Category</h6>
                <h6 className="mt-2 text-gray">{bookData?.stok}</h6>
              </div>
              <div className="d-flex justify-content-sm-between">
                <h6 className="mt-2 text-gray">Stock</h6>
                <h6 className="mt-2 text-gray">{bookData?.stok}</h6>
              </div>
            </div>
          </div>

          <div className="btn-group d-flex gap-3">
            <button className="bg-white text-ijo" onClick={handleBorrowClick}>
              Borrow
            </button>
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
