import { Terapia } from "../../../typings/cartella-clinica.d"

interface ITerapie {
    terapie : Array<Terapia>
}

const TerapieComp : React.FC<ITerapie> = (terapie) => {

    return (
        <>
            {terapie.terapie.map(terapia => 
                <TerapiaComp key={terapia.idTerapia} terapia={terapia} />             
            )}
        </>
    )
}

interface ITerapiaComp {
    terapia : Terapia
    key : string 
}

const TerapiaComp : React.FC<ITerapiaComp> = (terapia) => { 

    return (
        <>
            <form className="" >
                <div className="row">
                    <div className="col-md-4 mb-3 idStyle">
                        <span>ID: {terapia.terapia.idTerapia}</span>
                    </div>
                    <div className="col-md-4 mb-3"></div>
                    <div className="col-md-4 mb-3"></div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label >Medico</label>
                        <input type="text" className="form-control" id="firstName" value={terapia.terapia.idOperatore} disabled />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Data Prescrizione</label>
                        <input type="text" className="form-control" id="lastName" value={terapia.terapia.dataPrescrizione} disabled />
                    </div>
                </div>

                <div className="mb-12">
                    <label >Esito</label>
                    <div className="input-group">
                        <textarea className="form-control" id="firstName" value={terapia.terapia.terapiaPrescritta} disabled></textarea>
                    </div>
                </div>


                {/* <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button> */}
                
            </form>

            <div className="separatore"></div>

        </>
          

    )
}


export default TerapieComp