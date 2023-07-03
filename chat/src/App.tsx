import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './webpages/Home'
import Login from './webpages/Login'
import  Router  from './components/Router'

function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Router />}/>
      <Route path='/Home' element={<Home />}/>
      <Route path='/Login' element={<Login />}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App