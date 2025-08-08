import React, { useEffect } from "react";
import { useLoading } from "./LoadingContext";
import { Circles } from "react-loader-spinner";

const Loader: React.FC = () => {
  const { isLoading } = useLoading();

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <Circles
          height="80"
          width="80"
          color="#02778f"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
