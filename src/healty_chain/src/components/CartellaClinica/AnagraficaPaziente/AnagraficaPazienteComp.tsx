import { Paziente } from "../../../typings/cartella-clinica.d"

const AnagraficaPazienteComp : React.FC<Paziente> = ({idAddress, nome, cognome}) => {

    return (
        <form className="" >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label >Nome</label>
                <input type="text" className="form-control" id="firstName" value={nome} disabled />
              </div>
              <div className="col-md-6 mb-3">
                <label>Cognome</label>
                <input type="text" className="form-control" id="lastName" value={cognome} disabled />
              </div>
            </div>

            <div className="mb-3">
              <label >Public Key</label>
              <div className="input-group">
                <input type="text" className="form-control" id="username" value={idAddress} disabled />
              </div>
            </div>

        </form>
    )
}

export default AnagraficaPazienteComp