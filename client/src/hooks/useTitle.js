import { useEffect } from "react";

const useTitle = (page) => {
  useEffect(() => {
    document.title = ` Used Mobile | ${page}`;
  }, [page]);
};

export default useTitle;
