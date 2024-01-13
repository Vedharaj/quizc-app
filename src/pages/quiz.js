import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Quiz({BackgroundEffect, quiz, fetchData}){

    const navigate = useNavigate()
    
    const [answerManage, setAnswerManage] = useState([])
    const [loading, setLoading] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(()=>{
        const newArray = []
        if (quiz){
        quiz.forEach((e, i) => {
            newArray.push({
                id:i,
                correct_answer: e.correct_answer,
                selected_answer: '',
                isCorrect: false
            })
        });
        setAnswerManage(newArray)
        setTimeout(()=>{
            setLoading(false)
        },2000)
        } else{
            navigate(-1)
        }
    // eslint-disable-next-line
    },[quiz])

    
    async function handleSubmit(){
        if (isSubmit){
            await fetchData()
            setLoading(true)
            setIsSubmit(false)
            // navigate(0)
        }else {setIsSubmit(true)
            setBtnDisable(true)
            setAnswerManage(ps=>{
            return ps.map(e=> {
                if(e.correct_answer === e.selected_answer){
                    setScore(ps=>ps+1)
                    return{...e, isCorrect:true}
                } else{ 
                    return {...e}
                }})
            })}
        }
        
    function handleBtnClick(v, i){
        setAnswerManage(ps=>{
            return ps.map(e=> e.id === i
                ? {...e, selected_answer:v}
                : e
            )
        })
    }

    function handleBackBtn(){
        navigate(-1)
    }

    function AnsBtn({ans, j}){
        const currentAns = answerManage[j]
        let btnStyle = ''
        return ans.map((a, i)=>{
            if(!isSubmit){
                btnStyle = 'btn-primary'
            } else if(isSubmit && !currentAns.isCorrect && currentAns.selected_answer === ''){
                btnStyle = 'btn-warning'
            } else if(isSubmit && (currentAns.isCorrect || currentAns.correct_answer === a)){
                btnStyle = 'btn-success'
            } else if(isSubmit && !currentAns.isCorrect && currentAns.correct_answer !== a){
                btnStyle = 'btn-danger'
            } else{
                btnStyle = 'btn-outline-secondary'
            }
                return (
                <button 
                    key={i}
                    disabled={btnDisable}
                    className={`btn ansBtn m-1 ${(currentAns.selected_answer === a || 
                        (isSubmit && (currentAns.selected_answer === a || currentAns.correct_answer === a)))
                        ? btnStyle : 'btn-outline-secondary'}`} 
                    onClick={()=>handleBtnClick(a, currentAns.id)}
                    >
                {a}
                </button>)
            })
        }


    const Questions = ()=>{
        return quiz.map((e, i)=>{
            const ans = e.incorrect_answers
            ans.length === 3 && ans.splice(Math.floor(Math.random() * 4), 0, e.correct_answer)
            return (
            <div key={i} className="w-100 text-start">
                <h5 className="fw-medium text-justify d-inline">{i+1}. {e.question}</h5>
                <div className="d-flex flex-wrap my-3 w-100 justify-content-center">
                    <AnsBtn ans={ans} j={i}/>
                </div>
                <hr />
            </div>
        )})
    }

    return(
        <>
            <BackgroundEffect />
            <div className="context container-fluid">
                {loading ?
                <div className="loading-conatiner">
                    <div className="spinner"></div>
                </div>
                :
                <div className='cus-container2'>
                    <div className="mt-1">
                        <button className="btn mb-2" onClick={handleBackBtn}>
                            <i className="fa fa-arrow-left fa-lg"></i>
                        </button>
                        <h2 className="d-inline ms-3 text-primary fw-bold">Questions</h2>
                    </div>
                    <div className="mt-4 text-start">
                        <Questions />
                    </div>
                    <div className="w-100 d-flex justify-content-evenly align-items-center text-center">
                        {isSubmit && <h5 className="text-success fw-bold">
                            Your Score is {score} out of {quiz.length}</h5>}
                        <button className="btn btn-lg btn-success w-25" onClick={handleSubmit}>
                            {isSubmit ? 'Start Again' : 'Submit'}
                        </button>
                    </div>
                    {/* <p>{JSON.stringify(quiz)}</p> */}
                </div>
                }
            </div>
        </>
    )
}