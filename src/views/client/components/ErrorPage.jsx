import { useEffect, useState } from "react";
import Footer from "../layouts/Footer";
import LineProgress from "./LineProgress";

function ErrorPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {loading && <LineProgress />}
      {!loading && (
        <>
          <div className="error-page">
            <div className="caption text-center">
              <h1>404</h1>
              <h2 className="text-gray">Page Not Found </h2>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ErrorPage;
