import { useState } from "react"
import Headers from "./components/Headers"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
// import Tienda from "./pages/Tienda"

function App() {
  const [usuario, setUsuario] = useState(null)
  return (
    <div className="container-fluid p-0 d-flex flex-column d-flex flex-column align-items-center" style={{ 'minHeight': '100vh', 'minWidth': '100vw' }}>
      <Headers />
      {!usuario ?
        <Login setUsuario={setUsuario} /> :
        <Admin />
      }
    </div>
  )
}

export default App
