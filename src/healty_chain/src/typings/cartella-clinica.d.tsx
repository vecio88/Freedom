export interface CartellaClinica {
    datiAnagrafici : Paziente
    esami : Array<Esame> | null
    interventi : Array<Intervento> | null
    terapie : Array<Terapia> | null
}

export interface Paziente {
    idAddress: string | undefined
    nome: string | undefined
    cognome: string | undefined
}

export interface Esame {
    idEsame : string
    idOperatore : string
    dataPrescrizioneEsame : string
    oggetto : string
    esito : string | null
    stato : string
}

export interface Intervento {
    idIntervento : string
    idOperatore : string
    dataIntervento : string
    tipoIntervento : string
    struttura : string
}

export interface Terapia {
    idTerapia : string
    idOperatore : string 
    dataPrescrizione : string
    terapiaPrescritta : string
}