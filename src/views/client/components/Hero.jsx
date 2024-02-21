import booksIcon from "../../../assets/books.svg";
import shapeOne from "../../../assets/shape_1.svg";

function Hero() {
  return (
    <>
      <div className="container niolibs-hero">
        <div
          className="row flex-lg-row-reverse align-items-center g-4"
        >
          <div className="col-10 col-sm-8 col-lg-6 img-container">
            <img
              src={booksIcon}
              className="d-block mt-2 img-fluid niolibs-book-icon"
              alt="Bootstrap Themes"
              width="540"
              height="540"
            />
            <img src={shapeOne} alt="" className="shape" />
          </div>
          <div className="col-lg-6 hero-caption">
            <h1 className="fw-bolder lh-1 mb-3">
              Online Library for everyone
            </h1>
            <p className="lead fw-normal mt-4 mb-4 text-gray">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source
              toolkits.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
              <button
                type="button"
                className="btn btn-success btn-lg px-4 me-md-2"
              >
                Search your Book!
              </button>
              <button
                type="button"
                className="btn btn-outline-success border-2 btn-lg px-4"
              >
                Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
