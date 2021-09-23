
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

  const [username, setUsername] = useState("")
  const [start, setStart] = useState(false)
  
  
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


  const handleInputChange = (e) => {
    setUsername(e.target.value)
  }

  if (state.movies === 0) {
   return <div>load</div>
  }
  
  return (
    <div className="App">
      {
        start ? <Home allMovies={state} username={username} setStart={setStart} />
          :
          <>
            <input
              name="username"
              id="username"
              placeholder="Entrez votre nom"
              value={username}
              onChange={(e)=>handleInputChange(e)}
            />
            <button onClick={()=>setStart(true)} >Commencer</button>
          </>
      }
       
    </div>
  );
}

export default App;
