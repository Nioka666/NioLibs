// Sidebar.js
import React, { useEffect, useState } from "react";

function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <aside className={isVisible ? "show" : ""}>
        {/* <h4>
          <i className="fa-solid fa-swatchbook"></i>
        </h4> */}
        <h4>
          <i className="fa-solid fa-book-bookmark"></i>
        </h4>
        <h4>
          <i className="fa-solid fa-clock-rotate-left"></i>
        </h4>
      </aside>
    </>
  );
}

export default Sidebar;
