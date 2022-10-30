import { useState } from 'react'
import './App.scss'
import FormContainer from './components/formcontainer'

function App() {
  const [payLoad, setPayLoad] = useState({
    name: '',
    country: '',
    city: ''
  })

  const handleSubmit = () => {
    console.log(payLoad)
  }

  return (
    <>
      <div className="App">
        <FormContainer
          titulo="Dados Pessoais"
          type="Dados Pessoais"
        ></FormContainer>
        <FormContainer
          setPayLoad={setPayLoad}
          payLoad={payLoad}
          titulo="Destinos de Interesse"
          type="Destinos"
        ></FormContainer>
      </div>
      <button onClick={handleSubmit}>Enviar</button>
    </>
  )
}

export default App
