pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract CartellaClinica {

    mapping(address => CartellaClinica) cartelleCliniche;

    struct User {
        address idUser;
        string userType;
        string name;
        string surname;
        address owner;
    }

    struct Esame {
        // string idEsame
        address idOperatore;
        string dataPrescrizioneEsame;
        string oggetto;
        string esito;
        string stato;
    }

    struct CartellaClinica {
        User paziente;
        Esame[] esami;
    }

    function newCartellaClinica(address _idUser,
        string memory _userType,
        string memory _name,
        string memory _surname) public {

        User memory utente = User (_idUser, 
            _userType, 
            _name,
            _surname, 
            msg.sender);

        // Esame[] memory esami = new Esame[](0);
        
        // CartellaClinica memory cartella = CartellaClinica(utente, esami);
        // cartelleCliniche.push(cartella);
        cartelleCliniche[_idUser].paziente = utente; 
    }

    function getCartellaClinica(address _idUser) public returns (CartellaClinica memory) {
        return cartelleCliniche[_idUser];
    }

}