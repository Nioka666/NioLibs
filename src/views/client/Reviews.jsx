import Ratings from "./components/Ratings";

function Reviews() {

  
  return (
    <>
      <div className="container niolibs-reviews">
        <section className="review-header">
          <h4 className="text-gray">Reviews Section</h4>
        </section>
        <section className="review-body">
          <div className="review-row">
            <div className="review-avatar d-flex gap-3">
              <i className="fa-solid fa-circle-user fs-40 mt-1 ms-3 text-gray"></i>
              <div className="div d-grid gap-0">
                <h6 className="fw-bold text-gray">Nioka666</h6>
                <Ratings size={"small"} top={"-2px"} left={"-2px"} />
              </div>
            </div>
            <p className="text-gray fw-normal">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
              soluta architecto eligendi porro obcaecati dicta, veritatis quis.
              Sint, debitis deleniti. Et explicabo quidem quis libero,
              reiciendis vitae neque nam sapiente.
            </p>
          </div>
          <div className="review-row">
            <div className="review-avatar d-flex gap-3">
              <i className="fa-solid fa-circle-user fs-40 mt-1 ms-3 text-gray"></i>
              <div className="div d-grid gap-0">
                <h6 className="fw-bold text-gray">Nioka666</h6>
                <Ratings size={"small"} top={"-2px"} left={"-2px"} />
              </div>
            </div>
            <p className="text-gray fw-normal">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
              soluta architecto eligendi porro obcaecati dicta, veritatis quis.
              Sint, debitis deleniti. Et explicabo quidem quis libero,
              reiciendis vitae neque nam sapiente.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Reviews;
