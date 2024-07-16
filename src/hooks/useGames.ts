import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number,
  name: string;
  slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms:  {platform: Platform}[]  // like string[]
    metacritic: number;
  }
  
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }
  
const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
  
    // using effect hook to send a fetch request to the backend
    useEffect(() => {
        const controller = new AbortController();

      apiClient
        .get<FetchGamesResponse>("/games", { signal: controller.signal })
        .then((res) => setGames(res.data.results))
        .catch((err) => {
            // used CancelledError as it will send get request twice in StrictMode and first request will be cancelled always
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

        return () => controller.abort();
    }, []);

    return { games, error };
}

export default useGames;