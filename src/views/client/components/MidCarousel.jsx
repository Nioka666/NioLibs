import { Link } from "react-router-dom";
import { coverPath } from "../../../utils/client_env";

function MidCarousel() {
  return (
    <>
      <div className="containers" style={{ margin: "80px 120px" }}>
        <div className="d-flex gap-5">
          <div className="cover-carousel">
            <title>Placeholder</title>
            <img
              src={`${coverPath}/aesops_fabel.jpg`}
              alt=""
              className="rounded-3"
              height={430}
            />
          </div>
          <div className="d-grid justify-content-center align-content-center">
            <h1 className="fw-semibold">Aesop's Fabel</h1>
            <h5 className="text-gray mt-1">Listenning on your Son & Daughter</h5>
            <p className="lead mt-3">
              Another featurette? Of course. More placeholder content here to
              give you an idea of how this layout would work with some actual
              real-world content in place.
            </p>
            <Link reloadDocument to={"/"} className="fs-5 fw-bold text-lightgray mt-5">
              More Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MidCarousel;
