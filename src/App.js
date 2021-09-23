
import './App.css';

import {useState, useEffect} from "react"
import Home from './Home';
import {useMovieFetch} from './Hooks/useHome';

const quest = [
  {
  "questionText": "qui es-tu ?",
    "answerOptions": [
      {
        "answerText": "belinda",
        "isCorrect" : "true"
      },
      {
        "answerText": "linda",
        "isCorrect" : "false"
      },
      {
        "answerText": "gaelle",
        "isCorrect" : "false"
      }
    ]
  },
  {
    "questionText": "quel est ton âge ?",
    "answerOptions": [
      {
        "answerText": "26 ans",
        "isCorrect" : "true"
      },
      {
        "answerText": "25 ans",
        "isCorrect" : "false"
      },
      {
        "answerText": "20 ans",
        "isCorrect" : "false"
      }
    ]
  },
  {
    "questionText": "que veux-tu ?",
    "answerOptions": [
      {
        "answerText": "partir sur paris",
        "isCorrect" : "true"
      },
      {
        "answerText": "être bien",
        "isCorrect" : "false"
      },
      {
        "answerText": "ne pas déprimer",
        "isCorrect" : "false"
      }
    ]
  },
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [state, loading, error] = useMovieFetch();
  
  
  const handleAnswerButtonClick = (isCorrect) => {
   
    const nextQuestion = currentQuestion + 1;

   // console.log(isCorrect)
    
    setCurrentQuestion(nextQuestion);

    if (nextQuestion < 3) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    

    if (isCorrect === "true") {
      setScore(score + 1)
    }

  };

  const handleAnswerButton = (answer) => {
    
  }

  //https://api.themoviedb.org/3/movie/597891/credits?api_key=932abb19676c822ea035ea1f7b3c7d6b
 

  if (loading) {
   <div>load</div>
  }
  
  if (error || !Array.isArray(state.movies)) {
    return <p>There was an error loading your data!</p>;
  }
 

  return (
    <div className="App">
      <Home allMovies={state} /> 
      {
        showScore ?
          <div>Ton score est de {score } sur {quest.length }</div>
          :
          <>
            <h1>
              Question {currentQuestion + 1}
            </h1>
            <div>
              {
                quest[currentQuestion].questionText
              }
            </div>
            <div>
              {
                quest[currentQuestion].answerOptions.map((answer, index) => (
                  <button key={index} onClick={()=>handleAnswerButtonClick(answer.isCorrect)} >{ answer.answerText}</button>
                ))
              }
              <button onClick={() => handleAnswerButton(true)} >vrai</button>
              <button onClick={()=>handleAnswerButton(false)} >vrai</button>
            </div>
          </>
      }
    </div>
  );
}

export default App;
