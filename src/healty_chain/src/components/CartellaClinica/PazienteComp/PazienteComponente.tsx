import { useEffect, useState } from "react"
import { Accordion, Nav } from "react-bootstrap";
import { esempioCartellaClinica } from "../../../services/dati-esempio";
import { CartellaClinica } from "../../../typings/cartella-clinica.d";
import AnagraficaPazienteComp from "../AnagraficaPaziente/AnagraficaPazienteComp";
import '../cartella_clinica.css'
import EsamiComp from "../EsamiComponente/EsamiComp";
import InterventiComp from "../InterventiComponente/InterventiComp";
import TerapieComp from "../TerapieComponent/TerapieComp";

const PazienteComponente: React.FC = () => {

    const [cartellaClinica, setCartellaClinica] = useState<CartellaClinica>();

    useEffect(() => {
        setCartellaClinica(esempioCartellaClinica)
    }, [esempioCartellaClinica]);
    

    return (

        <div className="mainContainerCartella">
            <Accordion defaultActiveKey="0"  className="accordionContainer">
                <Accordion.Item eventKey="0" >
                    <Accordion.Header>Anagrafica</Accordion.Header>
                    <Accordion.Body className="corpoAccordion">
                        <AnagraficaPazienteComp 
                            idAddress={cartellaClinica?.datiAnagrafici.idAddress}
                            nome={cartellaClinica?.datiAnagrafici.nome}  
                            cognome = {cartellaClinica?.datiAnagrafici.cognome}  />
                    </Accordion.Body>
                </Accordion.Item>
                { cartellaClinica?.esami && cartellaClinica?.esami?.length > 0 && 
                    <Accordion.Item eventKey="1" >
                        <Accordion.Header>Esami</Accordion.Header>
                        <Accordion.Body className="corpoAccordion">
                            <EsamiComp  esami={cartellaClinica?.esami} />
                        </Accordion.Body>
                    </Accordion.Item>
                }
                { cartellaClinica?.interventi && cartellaClinica?.interventi?.length > 0 && 
                    <Accordion.Item eventKey="2" >
                        <Accordion.Header>Interventi</Accordion.Header>
                        <Accordion.Body className="corpoAccordion">
                            <InterventiComp  interventi={cartellaClinica?.interventi} />
                        </Accordion.Body>
                    </Accordion.Item>
                }
                { cartellaClinica?.terapie && cartellaClinica?.terapie?.length > 0 && 
                    <Accordion.Item eventKey="3" >
                        <Accordion.Header>Terapie</Accordion.Header>
                        <Accordion.Body className="corpoAccordion">
                            <TerapieComp  terapie={cartellaClinica?.terapie} />
                        </Accordion.Body>
                    </Accordion.Item>
                }
                </Accordion>
        </div>
    )
}

export default PazienteComponente