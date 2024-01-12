import React, {useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


import Home from './pages/home'
import Start from './pages/start'

function App() {

  const navigate = useNavigate();
  
  const [quizConfig, setQuizConfig] = useState({
    amount: '5',
    category: '9',
    difficulty: 'easy'
  })
  
  
  const [quiz, setQuiz] = useState([])
  
  function fetchData(url){
      fetch(url)
      .then(res=>res.json())
      .then(data=>{
          // console.log(data.results)
          setQuiz(data.results)})
      .catch(err=>{
        console.log(err)
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

  function navigateToHome(){
    const url = `https://opentdb.com/api.php?amount=${quizConfig.amount}&category=${quizConfig.category}&difficulty=${quizConfig.difficulty}&type=multiple`
    localStorage.setItem('url', url)
    fetchData(url)
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
          element={<Home
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
