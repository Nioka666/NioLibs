import useSWR from "swr";
import { AdminActions } from "../../utils/functions";

function MembersData() {
  const { data: usersList } = useSWR(
    "getUsersList",
    () => AdminActions.getUsersList(),
    {
      revalidateOnFocus: false,
    }
  );

  let rowNumber = 1;

  return (
    <>
      <div className="container d-grid gap-4">
        <div className="table-header-card">
          <h3>Members Data</h3>
          <p>Tables list of NioLibs Members, Listed here ..</p>
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
              {usersList?.map((user) => (
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

export default MembersData;
