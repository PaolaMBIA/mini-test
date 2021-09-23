import {useState, useEffect, useCallback} from 'react';


export const useActorMovie = (movieId, setAllActorInMovie) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    
    
   
    const fetchData = useCallback(async () => {
       
        setLoading(true)
        try {
            const actorInMovieFetchUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=932abb19676c822ea035ea1f7b3c7d6b`

            const resultActorInMovie = await (await fetch(actorInMovieFetchUrl)).json()
           
            // fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=932abb19676c822ea035ea1f7b3c7d6b`)
            // .then(data => data.json())
            // .then(data => {
            //     setAllActorInMovie([data.cast])   
            // })

            setAllActorInMovie(resultActorInMovie.cast)
            

        }catch (error){
            setError(error)
        }
        
        setLoading(false)
        //console.log("allActorInMovie",allActorInMovie)
    }, [ movieId])

    useEffect(() => {
        fetchData()

    }, [fetchData])

   
    
    return [ loading, error];
}