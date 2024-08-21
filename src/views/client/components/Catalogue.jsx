/* eslint-disable react/no-unescaped-entities */
import useSWR from "swr";
import { useState, useEffect } from "react";
import meinKampf from "/cover_books/das_kapital.jpg";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { BookService } from "../../../utils/functions";

function Catalogue() {
  const [bookListLoads, setBookListLoads] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const coverPath = "/cover_books/";

  const { data: bookLists } = useSWR(
    "fetchBookLists",
    () => BookService.fetchBookLists(),
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      setBookListLoads(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, [bookLists]);

  const handleMouseDown = (e) => {
    if (e.detail === 2) {
      // Handle double click
      return;
    }

    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <div
        className="niolibs-catalogue"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="catalogue-title">
          <h4
            className="text-gray fw-bold ms-4"
            style={{ position: "absolute" }}
          >
            <i className="fa-solid fa-fire-flame-curved text-gray fs-4"></i>
            Popular Books ..
          </h4>
        </div>
        <div className="catalogue-content">
          {bookLists?.map((book) => {
            return (
              <div
                key={book?._id}
                className="catalogue-card placeholder-glow d-grid gap-2"
              >
                {bookListLoads && (
                  <>
                    <div className="loading-indicator placeholder"></div>
                    <div className="loading-indicator-text placeholder"></div>
                    <div className="loading-indicator-text placeholder"> </div>
                  </>
                )}
                {!bookListLoads && (
                  <>
                    <Link reloadDocument to={`/book/details/${book?._id}`}>
                      <img src={`${coverPath}/${book?.cover}`} alt="" />
                      <div className="book-excerpt">
                        <h6 className="fw-bold">{book?.judul.toUpperCase()}</h6>
                        <Ratings size={"small"} />
                      </div>
                    </Link>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Catalogue;
