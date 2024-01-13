import React, {useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


import Quiz from './pages/quiz'
import Start from './pages/start'

function App() {

  const navigate = useNavigate();
  
  const [quizConfig, setQuizConfig] = useState({
    amount: '5',
    category: '9',
    difficulty: 'easy'
  })
  
  
  const [quiz, setQuiz] = useState([])
  
  function fetchData(){
    const url = `https://opentdb.com/api.php?amount=${quizConfig.amount}&category=${quizConfig.category}&difficulty=${quizConfig.difficulty}&type=multiple`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setQuiz(data.results)
    })
    .catch(err=>{
      // console.log(err)
    })
  }

  const BackgroundEffect = ()=>{
    return(
      <div className="area position-absolute" >
        <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
      </div >
    )
  }

  function handleQuizConfig(e){
    setQuizConfig(ps=>({
      ...ps,
      [e.target.name]: e.target.value
    }))
    // localStorage.setItem('quizconfig', quizConfig)
    // console.log(quizConfig)
  }

  async function navigateToHome(){
    await fetchData()
    navigate('/quiz')
  }

  return (
    <div className="App">
      <Routes>
        <Route 
          path='/' 
          element={<Start
            navigateToHome={navigateToHome}
            quizConfig={quizConfig} 
            BackgroundEffect={BackgroundEffect}
            SetQuizConfig={handleQuizConfig}
            />}
          />
        <Route 
          path='/quiz' 
          element={<Quiz
            quiz={quiz}
            BackgroundEffect={BackgroundEffect} 
            fetchData={fetchData}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;
