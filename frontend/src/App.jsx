import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { GenerateQuiz } from './components/GenerateQuiz'
import { QuizPage } from './components/QuizPage'
import { AllQuizzes } from './components/AllQuizzes'
import { QuizDetails } from './components/QuizDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/signup' element ={<Signup />} ></Route>
          <Route path = '/login' element ={<Login />} ></Route>
          <Route path = '/dashboard' element ={<Dashboard />} ></Route>
          <Route path = '/quiz/generate' element = {<GenerateQuiz />} />
          <Route path = '/quiz/:id' element = {<QuizPage />} />
          <Route path="/quiz" element={<AllQuizzes />} />
          <Route path="/quiz/:id" element={<QuizDetails />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
