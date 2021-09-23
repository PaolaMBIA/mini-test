import React, { useCallback, useEffect, useState } from "react"
import { useFetch } from './Hooks/useFetch';
import { useActorMovie } from './Hooks/useMovieByActor';
import {
    EmailIcon,
    EmailShareButton,
} from "react-share";
  

import defaultImage from "./assets/defaultImage.png"

function Home({ allMovies, username, setStart }) {
    

    const RANDOM_MOVIES = Math.floor(Math.random()*allMovies.movies.length)

    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [actor, setActor] = useState([]);
    const [correctResult, setCorrectResult] = useState(false)
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [loading, error] = useFetch(allMovies, setActor);

    const [allScore, setAllScore] = useState(false)
    
    
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []

    
  
    
    //const [allActorInMovie] = useActorMovie(allMovies.movies[currentQuestion]);
    const [allActorInMovie, setAllActorInMovie] = useState([]);
    
    const act = [actor.map(actor => actor.name)]
    const act2 = actor && [actor.map(actor => {
        return {nameActor : actor.name, profilActor: actor.profile_path }
    })]
    
     const item2 = act.map(item =>item[Math.floor(Math.random()*item.length)] ) ;
     const item1 = act2 && act2.map(item =>item[Math.floor(Math.random()*item.length)] ) ;
    
    
    const handleAnswerButtonClick = (isCorrect) => {
        
        try {
            fetch(`https://api.themoviedb.org/3/movie/${allMovies.movies[currentQuestion].id}/credits?api_key=932abb19676c822ea035ea1f7b3c7d6b`)
                .then(data => data.json())
                .then(data => {
                    setAllActorInMovie([data.cast])
                })

        } catch (error) {
            console.log(error.message)
        }

        const nextQuestion = currentQuestion + 1;

        setCurrentQuestion(nextQuestion);
    
        if (nextQuestion < 20) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
 
        }

        allActorInMovie && allActorInMovie.map((actor) =>
            actor.map((actorItem) => {
                if (actorItem.name === item2.toString()) {
                   return setCorrectResult(true)
                } else {
                   return setCorrectResult(false)
                }
                
            })
        )

  

        // if ((result === "true") && (isCorrect === result)) {
        //     alert("bonne réponse")
        // } else if((result === ))

        if (isCorrect === true && correctResult === true) {
            setScore(score + 1)
            setCorrectResult(false)
        } else if (isCorrect === false && correctResult === false) {
            setScore(score + 1)
        } else {

        }

   //    setCorrectResult(false)
    
    };
    
    const handleSaveScore = () => {
        const resultScore = {
            score: score,
            username: username
        }

        highScores.push(resultScore)
        highScores.sort((a, b) => b.score - a.score);

        localStorage.setItem('highScores', JSON.stringify(highScores))

        console.log(highScores)
    }


    if (allMovies.movies.length === 0 ||actor.length === 0) {
        return <div>load</div>
    }

    //console.log("allActorInMovie: ", allActorInMovie && allActorInMovie)

    return (
  
        <div>
            {
                showScore ?
                   <> <div>Ton score est de {score} sur {allMovies.movies.length}</div>
                        <button onClick={() => {
                            setShowScore(false)
                            setCurrentQuestion(0)
                            setScore(0)
                        }} >Rejouer</button>
                        <button onClick={() => handleSaveScore()} >Sauvegarder</button>
                        <button onClick={() => setStart(false)} >Retour à l'accueil</button>
                        
                        <button onClick={() => setAllScore(true)} >Regarder les scores</button>
                        <EmailShareButton
                            url="https://paolambia.fr/"
                            subject="résutat score"
                            body={highScores}
                            className="Demo__some-network__share-button"
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                        {
                            allScore && <div>
                                {
                                    highScores.map(highScore => (
                                        <span>{ highScore.username} {highScore.score }</span>
                                    ))
                                }
                            </div>
                        }
                    </>
                    
                    :
                    <>
                        <div>
                        <img src={`http://image.tmdb.org/t/p/w500${allMovies.movies[currentQuestion].poster_path}`} alt ="profil actor"/>
                            <img src={item1.map(profilPath => (
                                profilPath.profilActor ? `http://image.tmdb.org/t/p/w185${profilPath.profilActor}` : defaultImage
                            ))
                                
                            } alt="profil actor" />

                        </div>
                        <div>est-ce que <strong>{item1.map(name=>name.nameActor)}</strong>  a joué dans <strong>{allMovies.movies[currentQuestion].title }</strong> ?</div>


                        <button onClick={() => handleAnswerButtonClick(true)} >vrai</button>
                        <button onClick={() => handleAnswerButtonClick(false)} >faux</button>
                    </>
            }


        </div>
    )
}

export default Home;