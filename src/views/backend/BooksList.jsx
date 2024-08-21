import useSWR from "swr";
import { AdminActions } from "../../utils/functions";
import { Link } from "react-router-dom";

function BooksList() {
  const { data: booksList } = useSWR(
    "getbooksList",
    () => AdminActions.getBookLists(),
    {
      revalidateOnFocus: false,
    }
  );
  let rowNumber = 1;

  return (
    <>
      <div className="container d-grid gap-4">
        <div className="table-header-card d-flex">
          <section className="d-grid gap-1">
            <h3>Books List</h3>
            <p>Tables list of NioLibs Officers, Listed here ..</p>
          </section>
          <Link reloadDocument to={"/admin/books-add"}>
            <button>Add Book</button>
          </Link>
        </div>
        <div className="table-wrapper">
          <table className="table table-hover table-border">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Date Publish</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {booksList?.map((user) => (
                <tr key={user?._id}>
                  <td>{rowNumber++}</td>
                  <td>{user?.judul}</td>
                  <td>{user?.penulis}</td>
                  <td>{user?.penerbit}</td>
                  <td>{user?.tahun_terbit}</td>
                  <td>
                    <div className="action-btn-group d-flex gap-2">
                      <button>
                        <i className="fa-solid fa-pen text-warning"></i>
                      </button>
                      <button>
                        <i className="fa-solid fa-trash text-danger"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BooksList;
