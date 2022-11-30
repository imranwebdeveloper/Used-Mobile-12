import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        if (data.status) {
          setData(data);
        } else {
          setError(data.message);
        }
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };
    loadData();
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
