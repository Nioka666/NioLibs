/* eslint-disable react/no-unescaped-entities */
import useSWR from "swr";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthService, BookService } from "../../../utils/functions";
import meinKampf from "/cover_books/das_kapital.jpg";
import Ratings from "./Ratings";
import { coverPath } from "../../../utils/client_env";

function SmallCatalogue() {
  const [bookListLoads, setBookListLoads] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startX, setStartX] = useState(0);

  const { data: bookLists } = useSWR(
    "fetchBookLists",
    () => BookService.fetchBookLists(),
    {
      revalidateOnFocus: false,
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
        className="niolibs-small-catalogue"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
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
    </>
  );
}

export default SmallCatalogue;
