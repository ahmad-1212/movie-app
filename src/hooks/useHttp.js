import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Something went wrong (${response.message})`);
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(`${err.message}`);
      setLoading(false);
    }
  }, []);

  return [sendRequest, loading, error, setError];
};

export default useHttp;
