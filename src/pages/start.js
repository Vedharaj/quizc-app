import quizimg from '../images/quiz.png'

export default function Start({quizConfig, BackgroundEffect, SetQuizConfig, navigateToHome}){
    
    const handleContextMenu = (event) => {
        event.preventDefault();
    }

    return(
        <>
        <BackgroundEffect />
        <div className="context">
            <div className='cus-container1'>
                <img
                    className='quizimg'
                    src={quizimg} 
                    alt="quiz logo" 
                    onContextMenu={handleContextMenu}
                />
                <div className='d-flex w-75 flex-column align-items-center justify-content-center' >
                    <select
                        className="form-select" 
                        name='amount'
                        value={quizConfig.amount}
                        onChange={SetQuizConfig}
                        >
                      <option value={5} selected>5</option>
                      <option value={10}>10</option>
                    </select>
                    <select 
                        className="form-select mt-3"
                        name='category'
                        value={quizConfig.category}
                        onChange={SetQuizConfig}
                        >
                      <option value={9} selected>General Knowledge</option>
                      <option value={11}>Film</option>
                      <option value={19}>Mathematics</option>
                      <option value={21}>Sports</option>
                      <option value={23}>History</option>
                      <option value={24}>Politics</option>
                      <option value={26}>Celebrities</option>
                      <option value={28}>Vehicles</option>
                      <option value={31}>Japanese Anime and Mango</option>
                    </select>
                    <select 
                       className="form-select mt-3"
                       name='difficulty'
                       value={quizConfig.difficulty}
                       onChange={SetQuizConfig}
                       >
                      <option value="easy" selected>Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                </div>
                <button className='btn btn-success mt-4 w-25' onClick={navigateToHome}>
                    <span className='h4'>Start</span>
                </button>
            </div>
        </div>
        </>

    )
}
