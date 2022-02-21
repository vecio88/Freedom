
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
        return App.getListaBrani();
      });
  
    },
  
    getDatiAccount: async function() {
      console.log("Recupero i dati dell'account")
  
      var self = this;
  
      await web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
      
        // var account = accounts[4];
        
  
        self.account.address = accounts[4];
        document.getElementById("pubkey").setAttribute("value", self.account.address);
  
        
        //web3.eth.getBalance(self.account.address, function(error, ether) {
          // c : coefficients / significand
          // e : exponent
          // s : sign
  
  
          //console.log(ether)
        //});
          });
  
    
  
  
    },
  
    getListaBrani: async function() {
      console.log("getListaBrani")
     
      var freedomInstance;
  
      // deployed crea l'istanza che comunica con lo Smart Contract
      await App.contracts.Freedom.deployed().then(function(instance) {
        freedomInstance = instance;
  
      return freedomInstance.getLastTokenId.call();
    }).then(async function(maxTokenId) {
  
      console.log("maxTokenId: " + maxTokenId)
      var songsRow = $('.elencoBraniContainer');
      var songTemplate = $('#songTemplate');
      
      for (i = 1; i <= maxTokenId; i++) {

        var indice = i;

        var songJson = await App.getASong(freedomInstance.tokenURI(indice)).then(
          json => {
            return json
          }, reason => {
            // rejection
            console.log("Num Elementi: " + maxTokenId, "Indice: " + indice)
          })

          songTemplate.find('#imgCopertina').attr('src', songJson.attributes[0].copertina);
          songTemplate.find('#titoloBrano').text(songJson.name);
          songTemplate.find('#nomeAlbum').text(songJson.attributes[0].album);
          songTemplate.find('#description').text(songJson.description);
          songTemplate.find('#ascoltaLaCanzone').attr('data-id', indice);

          songsRow.append(songTemplate.html());
        
      }
    }).catch(function(err) {
      console.log(err.message);
    });

    return App.bindEvents();
  },
  
  getASong(resultTokenURI) {

    return resultTokenURI.then((song) => {

        return JSON.parse(song)

    })

  },

  handleAscolta : async function() {
    var freedomInstance;
    var tokenId = parseInt($(event.target).data('id'));

    const COSTO_ASCOLTO_FREDOM = "2000000000000000000";
    const COSTO_ASCOLTO_PIATTAFORMA = "1000000000000000000";
    let accountAddress = web3.eth.accounts[4];

    checkPagamento = await App.contracts.Freedom.deployed().then(function(instance) {
      freedomInstance = instance;
      
      console.log(accountAddress)
      // Execute adopt as a transaction by sending account
      return  freedomInstance.isPiattaforma({from: accountAddress});
    }).then(function(result) {
      let costoAscolto = COSTO_ASCOLTO_FREDOM
      if (result) costoAscolto = COSTO_ASCOLTO_PIATTAFORMA

      return freedomInstance.depositaEthaddAscolti({from: accountAddress, value: costoAscolto })
    }).then(function(checkPagamento) {
      
      if(checkPagamento) {
        return freedomInstance.addAscolti(parseInt(tokenId), {from: accountAddress});
      } else {
        alert("Si è verificato un problema con il pagamento")
      }
     
    }).catch(function(err) {
      console.log(err.message);
      return false;
    });

    // console.log("Esito Pagamento", checkPagamento)

    if(checkPagamento) {}

    // deployed crea l'istanza che comunica con lo Smart Contract
    /*await App.contracts.Freedom.deployed().then(function(instance) {
      var accountFrom = web3.eth.accounts[4];
  
      instance.addAscolti(parseInt(tokenId), {from: accountFrom});
    }).catch(function(err) {
      console.log(err.message);
    }); */
  },
    // Bind degli eventi 
  bindEvents: function() {
      // console.log("bindEvents")
      $(document).on('click', '#ascoltaLaCanzone', App.handleAscolta);
  }
  
  };

  
$(function() {
    $(window).load(function() {
        App.initWeb3();
    });
});

