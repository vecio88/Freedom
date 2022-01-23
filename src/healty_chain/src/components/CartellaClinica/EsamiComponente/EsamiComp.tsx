import { Esame } from "../../../typings/cartella-clinica.d"

interface IEsami {
    esami : Array<Esame>
}

const EsamiComp : React.FC<IEsami> = (esami) => {

    return (
        <>
            {esami.esami.map(esame => 
                <EsameComp key={esame.idEsame} esame={esame} />             
            )}
        </>
    )
}

interface IEsameComp {
    esame : Esame
    key : string 
}

const EsameComp : React.FC<IEsameComp> = (esame) => { 

    return (
        <>
            <form className="" >
                <div className="row">
                    <div className="col-md-4 mb-3 idStyle">
                        <span>ID: {esame.esame.idEsame}</span>
                    </div>
                    <div className="col-md-4 mb-3"></div>
                    <div className="col-md-4 mb-3"></div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label >Oggetto</label>
                        <input type="text" className="form-control" id="firstName" value={esame.esame.oggetto} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Data Prescrizione</label>
                        <input type="text" className="form-control" id="lastName" value={esame.esame.dataPrescrizioneEsame} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Medico</label>
                        <input type="text" className="form-control" id="lastName" value={esame.esame.idOperatore} disabled />
                    </div>
                </div>

                <div className="mb-12">
                <label >Esito</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="username" value={esame.esame.esito != null ? esame.esame.esito : ""} disabled />
                </div>
                </div>


                {/* <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button> */}
                
            </form>

            <div className="separatore"></div>

        </>
          

    )
}


export default EsamiComp