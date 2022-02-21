App = {
  web3Provider: null,
  contracts: {},
  
  account : {
    address : null,
    balance: 0
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      console.log("GANACHE")
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    App.account.address = web3.eth.accounts[accountIndex];
    balanceInWei = web3.eth.getBalance(App.account.address)+ "";
    balanceInEth = parseFloat(balanceInWei / 1000000000000000000).toFixed(8); // 79,90512904

    // console.log("Ciao",parseFloat("123.456").toFixed(2) )
    document.getElementById('accountAddress').innerText = App.account.address;
    document.getElementById('accountBalance').innerText = balanceInEth;
    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON('../build/contracts/Freedom.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var FreedomArtifact = data;
      App.contracts.Freedom = TruffleContract(FreedomArtifact);

      // console.log(App.contracts.Freedom)
      // Set the provider for our contract
      App.contracts.Freedom.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      // return App.getListaBrani();
    });

     return App;
  },

   addBrano: async function(accountFrom, jsonBrano) {
    const CostoInserimentoBrano = "7000000000000000000";

    checkPagamento = await App.contracts.Freedom.deployed().then(function(instance) {
      freedomInstance = instance;
      
      // Execute adopt as a transaction by sending account
      return  freedomInstance.depositaEthAddBrano({from: accountFrom, value: CostoInserimentoBrano });
    }).then(function(result) {
      return true;
    }).catch(function(err) {
      console.log(err.message);
      return false;
    });

    console.log("Esito Pagamento", checkPagamento)

    if(checkPagamento) {

      await App.contracts.Freedom.deployed().then(function(instance) {
        freedomInstance = instance;
       
        // Execute adopt as a transaction by sending account
        return  freedomInstance.addCanzone(jsonBrano, {from: accountFrom, gas: 6721975, gasPrice: '30000000'});
          }).then(function(result) {
             
            return true;
          }).catch(function(err) {
            console.log(err.message);
            return false;
          });
    }
    
  },

  // Bind degli eventi 
  bindEvents: function() {
    console.log("bindEvents")
    $(document).on('click', '.btn-ins-song', App.handleAdopt);
  }

};

$(function() {
    $(window).load(function() {
      App.initWeb3();
    });
  });

document.getElementById("formInsertSongSubmit").addEventListener("click", function () {

    var pubkey = document.getElementById("pubkey").value;
    var titoloCanzone = document.getElementById("titoloCanzone").value;
    var breveDescrizione = document.getElementById("breveDescrizione").value;
    var titoloAlbum = document.getElementById("titoloAlbum").value;
    var linkCopertina = document.getElementById("linkCopertina").value;
    var linkAlBrano = document.getElementById("linkAlBrano").value;

    var tokenURI = "{ \"name\": \"" + titoloCanzone + "\", \"description\": \"" + breveDescrizione + "\", \"image\": \"" + linkAlBrano + "\", \"attributes\": [{\"album\" : \"" + titoloAlbum + "\", \"copertina\" : \"" + linkCopertina + "\"}]}";
    const tokenURIJson = JSON.parse(tokenURI);

    if (App.addBrano(pubkey, tokenURI)) {
        alert("Brano inserito con successo")
    } else {
        alert("Si è verificato un errore")
    }

    return;
});