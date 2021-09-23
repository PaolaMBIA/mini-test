import {useState, useEffect, useCallback} from 'react';


export const useFetch = (allMovies, setActor) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            await allMovies.movies.map(await ((movie)  => (
                fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=932abb19676c822ea035ea1f7b3c7d6b`)
                .then(data => data.json())
                .then(data => {
                    setActor(actor=>[ ...actor, ...data.cast])      
                })
            )))
        }catch (error){
            setError(error)
        }

        setLoading(false)
    }, [ allMovies.movies, setActor])

    useEffect(() => {
        fetchData()

    }, [fetchData])


    return [ loading, error];
}