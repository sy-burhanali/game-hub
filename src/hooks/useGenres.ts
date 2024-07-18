import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}


const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    // using effect hook to send a fetch request to the backend
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
      apiClient
        .get<FetchGenresResponse>("/genres", { signal: controller.signal })
        .then((res) => {
          setGenres(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
            // used CancelledError as it will send get request twice in StrictMode and first request will be cancelled always
            if (err instanceof CanceledError) return;
            setError(err.message)
            setLoading(false); 
        });

        return () => controller.abort();
    }, []);

    return { genres, error, isLoading };
};

export default useGenres;