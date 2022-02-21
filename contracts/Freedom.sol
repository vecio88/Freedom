// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >= 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Freedom is ERC721URIStorage {

  uint256 public counterCanzoni;
  uint Anno;
  address payable owner;
  uint balanceAnnuale;

  struct Ascolti{
     uint tokenId;
     uint listens;
   }

  mapping (address => bool) piattaforme;
  mapping (address => uint[]) proprietari;
  mapping (string => bool) tokenURIExists;
  mapping (uint => uint) ascolti;
  Ascolti[] public classifica;

  constructor() payable ERC721("Freedom", "FREE") {
    owner = payable(msg.sender);
    Anno = block.timestamp + 365 days;
    balanceAnnuale = 0;

    address spotify = address(0xA0855034D404e7e4be931FFDcDC4B28CFEa15b5D);
    piattaforme[spotify] = true;
  }

  function addCanzone(string  memory _tokenURI) public {
    // controlla che l'indirizzo del chiamante è diverso da 0
    require(msg.sender != address(0), "indirizzo non valido");
    // controlla se il token uri gia esiste
    require(!tokenURIExists[_tokenURI], "URI esistente");

    
    // require(!pagamento( payable(address(this))), "Pagamento non andato a buon fine");

    
    //incrementa il contatore delle canzoni
    counterCanzoni++;
    // crea la canzone come nft
    uint256 tokenId = counterCanzoni;
    _safeMint(msg.sender,tokenId);
    //imposta tokenURI
    _setTokenURI(tokenId,_tokenURI);
    tokenURIExists[_tokenURI] = true;
    //inserisce la canzone al suo proprietario
    proprietari[msg.sender].push(tokenId);
    //setta a 0 gli ascolti
    Ascolti memory newAscolti = Ascolti(tokenId,0);
    classifica.push(newAscolti);
    balanceAnnuale += 2 ether;
      
  }

   

  function exists (uint256 tokenId) public view returns (bool) {
    return _exists(tokenId);
  }

  function getLastTokenId() public view returns(uint256){
    return counterCanzoni;
  }

  function isPiattaforma() public view returns (bool) {
    if(piattaforme[msg.sender] == true) return true;
    else return false;
  }

  function getPropriBrani() public view returns(uint[] memory){
    return proprietari[msg.sender];
  }

  function getAscolti(uint256 tokenId) public view returns(uint){
    return ascolti[tokenId];
  }

  function depositaEth() public payable returns (bool) {
      // Call returns a boolean value indicating success or failure.
      // This is the current recommended method to use.
      (bool sent, ) = payable(address(this)).call{value: msg.value}("");
      require(sent, "Failed to send Ether");
      return sent;
  }

  function addAscolti(uint256 tokenId) external{
    // ottieni ascolti
    uint costo = 2 ether;
    if (isPiattaforma()){
      costo = 1 ether;
    }
    balanceAnnuale += costo;
    ascolti[tokenId] += 1;
    for (uint256 i= 0; i < counterCanzoni; i++){
      if (classifica[i].tokenId == tokenId){
        classifica[i].listens += 1;
      }
    }
  }

  function ordinaClassifica() public{ //private
    for (uint256 i = 1;i<counterCanzoni;i++){
      Ascolti memory value= classifica[i];
      uint256 j = i-1;
      while (j>= 0 && classifica[j].listens < value.listens ){
        classifica[j+1] = classifica[j];
        j = j+1;
      }
      classifica[j+1] = value;
    }
  }

  function pagamentoClassifica() external payable{
    require(msg.sender == owner,"Non sei il proprietario");
    require(block.timestamp >= Anno, "Non anocra!!");
    ordinaClassifica();
    //30% rimane allo SC
    balanceAnnuale -= balanceAnnuale * 30/100 ;
    //20% che verrà spartito tra i top 1000
    uint256 value = balanceAnnuale * 20/100 ;   
    for (uint256 i = 0; i< 1000;i++){
      inviaEther(payable(ownerOf(classifica[i].tokenId)),value/1000);
    }
    //il resto spartito tra tutti gli altri
    balanceAnnuale -= value;
    for (uint256 i = 0; i< counterCanzoni;i++){
      inviaEther(payable(ownerOf(classifica[i].tokenId)),balanceAnnuale/counterCanzoni);
    }
    balanceAnnuale = 0;
    Anno =block.timestamp + 365 days;
  }

  function inviaEther(address payable _to, uint amount) public payable{ 
       amount = amount * 1000000000000000000;
      (bool sent, ) = _to.call{value: amount}("");
      require(sent, "Failed to send Ether");
  }

 

  function ritiraEther() external payable{
    (bool inviato, ) = owner.call{value: (address(this).balance)}(""); 
    require(inviato, "Transfer Failed");
  }

  fallback() external payable {}

  receive() external payable {}

  /*function getClassifica(uint _index) public view returns(Ascolti[] memory){
    return classifica;
  }*/

  function getElemClass(uint i) public view returns (uint tokenId, uint listens){
    Ascolti storage todo = classifica[i];
    return (todo.tokenId, todo.listens);
  }

    
}