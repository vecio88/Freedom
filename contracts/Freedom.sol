// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Freedom is ERC721URIStorage {
    uint256 public counterCanzoni;
    uint256 Anno;
    address payable owner;
    uint256 balanceAnnuale;
    uint constant ETH_PER_ADD_CANZONE = 7;
    uint constant ETH_PER_ADD_ASCOLTO_UTENTE = 2;
    uint constant ETH_PER_ADD_ASCOLTO_PIATTA = 1;

    struct Ascolti {
        uint256 tokenId;
        uint256 listens;
    }

    mapping(address => bool) piattaforme;
    mapping(address => uint256[]) proprietari;
    mapping(string => bool) tokenURIExists;
    mapping(uint256 => uint256) ascolti;
    mapping(uint256 => uint256) helper;
    Ascolti[] public classifica;
    Ascolti[] public sortedClassifica;

    constructor() payable ERC721("Freedom", "FREE") {
        owner = payable(msg.sender);
        Anno = block.timestamp + 365 days;
        balanceAnnuale = 0;

        address spotify = address(0xf2e34E46337248fECD2EAa83783ED0B8a450dD15);
        piattaforme[spotify] = true;
    }

    fallback() external payable {}

    receive() external payable {}

    function addCanzone(string calldata _tokenURI) external returns (uint256) {
        // controlla che l'indirizzo del chiamante è diverso da 0
        require(msg.sender != address(0), "indirizzo non valido");
        // controlla se il token uri gia esiste
        require(!tokenURIExists[_tokenURI], "URI esistente");
        uint256 amount = 7 ether;
        //controlla se il balance del chiamante è sufficiente per inserire una canzone
        require(msg.sender.balance >= amount);
        //incrementa il contatore delle canzoni
        counterCanzoni++;
        // crea la canzone come nft
        uint256 tokenId = counterCanzoni;
        _safeMint(msg.sender, tokenId);
        //imposta tokenURI
        _setTokenURI(tokenId, _tokenURI);
        tokenURIExists[_tokenURI] = true;
        //inserisce la canzone al suo proprietario
        proprietari[msg.sender].push(tokenId);
        //setta a 0 gli ascolti
        Ascolti memory newAscolti = Ascolti(tokenId, 0);
        classifica.push(newAscolti);
        //inviaEther(msg.sender ,address(this), 10000000000000000000);
        balanceAnnuale += amount;
        return tokenId;
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function getLastTokenId() public view returns (uint256) {
        return counterCanzoni;
    }

    function isPiattaforma() public view returns (bool) {
        if (piattaforme[msg.sender] == true) return true;
        else return false;
    }

    function getPropriBrani() public view returns (uint256[] memory) {
        return proprietari[msg.sender];
    }

    function getAscolti(uint256 tokenId) public view returns (uint256) {
        return ascolti[tokenId];
    }

    function depositaEthAddBrano() public payable returns (bool) {
        require(msg.value != ETH_PER_ADD_CANZONE, "Si sta cercando di trasmettere una quantita di ETH diversa da quella attesa");

        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, ) = payable(address(this)).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        return sent;
    }

    function addAscolti(uint256 id) external returns (bool) {
        // ottieni ascolti
        uint256 amount = ETH_PER_ADD_ASCOLTO_UTENTE;
        if (isPiattaforma()) {
            amount = ETH_PER_ADD_ASCOLTO_PIATTA;
        }
        require(msg.sender.balance >= amount, "Non hai abbastanza Ether");
        balanceAnnuale += amount;
        ascolti[id] += 1;
        for (uint256 i = 0; i < counterCanzoni; i++) {
            if (classifica[i].tokenId == id) {
                classifica[i].listens += 1;
            }
        }
        return true;
    }

    function depositaEthaddAscolti() public payable returns (bool) {
        require(msg.value != ETH_PER_ADD_ASCOLTO_UTENTE || msg.value != ETH_PER_ADD_ASCOLTO_PIATTA, "Si sta cercando di trasmettere una quantita di ETH diversa da quella attesa");

        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, ) = payable(address(this)).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        return sent;
    }

    function sort() private {
        for (uint256 i = 0; i < classifica.length; i++) {
            helper[i] = 0;
            for (uint256 j = 0; j < i; j++) {
                if (classifica[i].listens > classifica[j].listens) {
                    helper[i] = helper[j];
                    helper[j] = helper[j] + 1;
                }
            }
            if (helper[i] == 0) {
                helper[i] = i + 1;
            }
        }
        uint256 lengthsortedClassifica = sortedClassifica.length;
        for (uint256 i = 0; i < classifica.length; i++) {
            if (i < lengthsortedClassifica) continue;
            sortedClassifica.push(Ascolti(0, 0));
        }

        for (uint256 i = 0; i < classifica.length; i++) {
            sortedClassifica[helper[i] - 1] = classifica[i];
        }
    }

    function pagamentoClassifica() external payable returns (bool) {
        require(msg.sender == owner, "Non sei il proprietario");
        //require(block.timestamp >= Anno, "Non ancora!!");
        sort();
        //20% che verrà spartito tra i top 10
        uint256 value = (balanceAnnuale * 20) / 100;
        //il 30% spartito tra tutti gli altri
        uint256 value1 = (balanceAnnuale * 30) / 100;
        for (uint256 i = 0; i < counterCanzoni; i++) {
            uint256 amount = value1 / counterCanzoni;
            if (i < 10) {
                amount += value / 10;
            }
            (bool sent, ) = payable(ownerOf(classifica[i].tokenId)).call{value: amount }("");
            require(sent, "Failed to send Ether");
            // inviaEther(payable(ownerOf(classifica[i].tokenId)),amount);
            
        }
        balanceAnnuale = 0;
        Anno = block.timestamp + 365 days;
        return true;
    }

    function inviaEther(address payable _to, uint amount) public payable returns(bool){ 
        (bool sent, ) = _to.call{value: amount }("");
        require(sent, "Failed to send Ether");
        return sent;
    }

    function ritiraEther() external payable returns (bool) {
        (bool sent, ) = owner.call{value: (address(this).balance)}("");
        require(sent, "Transfer Failed");
        return sent;
    }

    function checkDisponibilita () public payable returns(bool) {
        if (msg.value <= msg.sender.balance) {
            return true;
        } else {
            return false;
        }
    }

    function getBalanceAnnuale () public view returns (uint256) {
        return balanceAnnuale;
    }
    

}