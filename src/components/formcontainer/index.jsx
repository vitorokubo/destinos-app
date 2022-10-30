import './styles.scss'
import { Formulario } from '../formulario'

export const FormContainer = props => {
  return (
    <>
      <div className="Content">
        <div className="Title">
          <h1>{props.titulo}</h1>
        </div>
        <div className="Body">
          <Formulario
            type={props.type}
            setPayLoad={props.setPayLoad}
            payLoad={props.payLoad}
          ></Formulario>
        </div>
      </div>
    </>
  )
}

export default FormContainer
