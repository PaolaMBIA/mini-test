import {useState, useEffect, useCallback} from 'react';


export const useMovieFetch = () => {
    const [state, setState] = useState ({movies: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        setError(false);
        setLoading(true);
        try {
            const resultUrl = `https://api.themoviedb.org/3/discover/movie?api_key=932abb19676c822ea035ea1f7b3c7d6b`

            const resultData = await (await fetch(resultUrl)).json()
            setState({movies: [...resultData.results]})
        
          } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(()=>{
        fetchData();
    },[fetchData])

    return [state, loading, error];
}