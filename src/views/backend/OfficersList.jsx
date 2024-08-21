import useSWR from "swr";
import { AdminActions } from "../../utils/functions";
import { Link } from "react-router-dom";

function OfficersList() {
  const { data: officersList } = useSWR(
    "getOfficersList",
    () => AdminActions.getOfficersList(),
    { revalidateOnFocus: false }
  );

  console.log(officersList);

  let rowNumber = 1;

  return (
    <>
      <div className="container d-grid gap-4">
        <div className="table-header-card d-flex">
          <section className="d-grid gap-1">
            <h3>Officers Data</h3>
            <p>Tables list of NioLibs Officers, Listed here ..</p>
          </section>
          <Link reloadDocument to={"/admin/officers-add"}>
            <button>Add Officer</button>
          </Link>
        </div>
        <div className="table-wrapper">
          <table className="table table-hover table-border">
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {officersList?.map((user) => (
                <tr key={user?._id}>
                  <td>{rowNumber++}</td>
                  <td>{user?.nama_lengkap}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.tanggal_bergabung}</td>
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

export default OfficersList;
