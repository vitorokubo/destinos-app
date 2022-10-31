import { useState } from 'react'
import './App.scss'
import FormContainer from './components/formcontainer'

function App() {
  const [payLoad, setPayLoad] = useState({
    name: '',
    email: '',
    tel: '',
    cpf: '',
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
          setPayLoad={setPayLoad}
          payLoad={payLoad}
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
      <div className="Button">
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </>
  )
}

export default App
