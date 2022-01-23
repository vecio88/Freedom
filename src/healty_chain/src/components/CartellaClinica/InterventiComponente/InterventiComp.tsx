import { Intervento } from "../../../typings/cartella-clinica.d"

interface IInterventi {
    interventi : Array<Intervento>
}

const EsamiComp : React.FC<IInterventi> = (interventi) => {

    return (
        <>
            {interventi.interventi.map(intervento => 
                <InterventoComp key={intervento.idIntervento} intervento={intervento} />             
            )}
        </>
    )
}

interface IInterventoComp {
    intervento : Intervento
    key : string 
}

const InterventoComp : React.FC<IInterventoComp> = (intervento) => { 

    return (
        <>
            <form className="" >
                <div className="row">
                    <div className="col-md-4 mb-3 idStyle">
                        <span>ID: {intervento.intervento.idIntervento}</span>
                    </div>
                    <div className="col-md-4 mb-3"></div>
                    <div className="col-md-4 mb-3"></div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>Oggetto dell'intervento</label>
                        <input type="text" className="form-control" id="firstName" value={intervento.intervento.tipoIntervento} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Data Intervento</label>
                        <input type="text" className="form-control" id="lastName" value={intervento.intervento.dataIntervento} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Medico</label>
                        <input type="text" className="form-control" id="lastName" value={intervento.intervento.struttura} disabled />
                    </div>
                </div>

                <div className="mb-12">
                <label >Medico Operante</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="username" value={intervento.intervento.idOperatore} disabled />
                </div>
                </div>


                {/* <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button> */}
                
            </form>

            <div className="separatore"></div>

        </>
          

    )
}


export default EsamiComp