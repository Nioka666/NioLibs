import { Link } from "react-router-dom";
import { AdminActions } from "../../utils/functions";
import { useState } from "react";

function BooksAdd() {
  const [isBookAdded, setIsBookAdded] = useState(false);

  const handleAddBooks = async () => {
    try {
      const response = await AdminActions.addBooks();
      if (response?.status === 200) {
        setIsBookAdded(true);
      } else {
        setIsBookAdded(false);
      }
    } catch (error) {
      setIsBookAdded(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="table-header-card d-flex">
          <section className="d-grid gap-1">
            <h3>Books List</h3>
            <p>Tables list of NioLibs Officers, Listed here ..</p>
          </section>
          <Link reloadDocument to={"/admin/books-add"}>
            <button>Add Book</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BooksAdd;
