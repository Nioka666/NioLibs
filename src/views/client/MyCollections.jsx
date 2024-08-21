import { Link, useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AuthService, UserActions } from "../../utils/functions";
import { coverPath } from "../../utils/client_env";
import SpinnerGrow from "./components/SpinnerGrow";
import { useEffect, useState } from "react";

function MyCollections() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userID } = useParams();
  const { data: userSession, isValidating: loadUserSession } = useSWR(
    "checkUserSession",
    () => AuthService.checkUserSession(),
    { revalidateOnFocus: true }
  );

  useEffect(() => {
    if (userSession === undefined && !loadUserSession) {
      navigate("/");
    }
  });

  const { data: bookCollection, isValidating: collectionLoads } = useSWR(
    "findBookCollection",
    () => UserActions.findBookCollectionById(userID),
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {!loading && (
        <>
          <div className="container mt-5 text-center">
            <h2 className="mb-3 fw-bold text-darkgrays">My Collections</h2>
            <h5 className="mb-5 fw-normal text-gray">
              Book Collection is Stored here . .
            </h5>
          </div>
          <div className="container collection-container mb-5">
            {collectionLoads && (
              <>
                <SpinnerGrow />
              </>
            )}
            {!collectionLoads &&
              bookCollection?.data?.map((book) => (
                <>
                  <Link reloadDocument to={`/book/details/${book?.buku_id}`}>
                    <div className="collection-card">
                      <img
                        src={`${coverPath}/${book?.cover}`}
                        height={130}
                        width={90}
                        className="rounded-2"
                        alt=""
                      />
                      <div className="col-lg-8">
                        <h5 className="mb-0">{book?.judul}</h5>
                        <small className="text-body-secondary">
                          {book?.penulis}
                        </small>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
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
      )}
    </>
  );
}

export default MyCollections;
