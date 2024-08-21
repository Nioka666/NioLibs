import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import { AuthService, UserActions } from "../../utils/functions";

function Borroweds() {
  const { userID } = useParams();
  const { data: borrowingData } = useSWR("fetchBorrowingData", () =>
    UserActions.findBorrowingDetails()
  );

  return (
    <>
      <div className="container mt-5 text-center">
        <h2 className="mb-3 fw-bold text-darkgrays">My Collections</h2>
        <h5 className="mb-5 fw-normal text-gray">
          Book Collection is Stored here . .
        </h5>
      </div>
      <div className="container collection-container mb-5">
        {/* {collectionLoads && (
          <>
            <SpinnerGrow />
          </>
        )} */}
        <>
          <Link reloadDocument to={`/`}>
            <div className="collection-card">
              <img
                // src={`${coverPath}/${book?.cover}`}
                height={130}
                width={90}
                className="rounded-2"
                alt=""
              />
              <div className="col-lg-8">
                <h5 className="mb-0">...</h5>
                <small className="text-body-secondary">...</small>
              </div>
            </div>
          </Link>
        </>
        <Link reloadDocument to={`/`}>
          <div className="add-collection-card">
            <div className="col-lg-8 text-center">
              <h1>
                <i className="fa-solid fa-plus"></i>
              </h1>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Borroweds;
