import './App.css'
import Maininfo from './components/MainInfo/Maininfo'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <div className="bg-white relative flex flex-col gap-2">
      <Navbar />
      <Maininfo />
    </div>
  )
}

export default App
