import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
 
  return (
    <div 
      style={{
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
      >
      <Navbar />
      <main 
        style={{
          minHeight: "calc(100vh - 200px)" ,
        }}
      >
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default App
