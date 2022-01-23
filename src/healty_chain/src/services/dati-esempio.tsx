import { CartellaClinica } from "../typings/cartella-clinica.d";


export const esempioCartellaClinica : CartellaClinica = {

    datiAnagrafici : {
        idAddress : "0x8270c3acE25831d2247e5AB4D40925925a5B8f22",
        nome : "MARIO",
        cognome : "ROSSI"
    },

    esami : [{ 
        idEsame : "ES000",
        idOperatore : "MED001",
        dataPrescrizioneEsame : "11/11/2021",
        oggetto : "Visita Pneumologica",
        esito : null,
        stato : "PRESCRITTA"
    }, { 
        idEsame : "ES001",
        idOperatore : "MED001",
        dataPrescrizioneEsame : "22/11/2021",
        oggetto : "Visita Pneumologica",
        esito : "Leggera infiammazione",
        stato : "ESITO"
    }],

    interventi : [{
        idIntervento : "INT000",
        idOperatore : "MED002",
        dataIntervento : "01/01/2022",
        tipoIntervento : "Correzzione del setto nasale",
        struttura : "Banbin Gesù - Roma"
    }],

    terapie : [{
        idTerapia : "TER000",
        idOperatore : "MED001",
        dataPrescrizione : "22/11/2021",
        terapiaPrescritta : "Due compresse di qualcosa al giorno"
    }]

}