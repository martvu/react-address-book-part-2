import { useEffect, useRef, useState } from "react";

function useFetchData<T>(url: string, initialState: T) {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const firstRender = useRef(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchData();
  }, [url]);

  return { data, refetch: fetchData, error, loading };
}

export default useFetchData;
