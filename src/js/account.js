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
      console.log("initContract")
      return App.initContract();
    },
  
    initContract: function() {
      
      $.getJSON('../build/contracts/Freedom.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var FreedomArtifact = data;
        App.contracts.Freedom = TruffleContract(FreedomArtifact);
  
        // console.log(App.contracts.Subfree)
        // Set the provider for our contract
        App.contracts.Freedom.setProvider(App.web3Provider);
        
        // Use our contract to retrieve and mark the adopted pets
        return App.getListaBrani()
        
      });
  
       // return App.getListaBrani()
    },
  
    getDatiAccount: function() {
      console.log("Recupero i dati dell'account")
        // let accountAddress;
        let accountAddress = web3.eth.accounts[4];

        App.contracts.Freedom.deployed().then(function(instance) {
            return instance.isPiattaforma({from : accountAddress});
        }).then(function(isPiattaforma) {
            console.log(isPiattaforma)
        }).catch(function(err) {
          console.log(err.message);
        });

       //  console.log("QUI: " + accountAddress)
       // return accountAddress;
    },
  
    getListaBrani: async function() {
      console.log("getListaBrani")
     
      var freedomInstance;
      // console.log(App.contracts.Freedom)
      // deployed crea l'istanza che comunica con lo Smart Contract
      await App.contracts.Freedom.deployed().then(function(instance) {
        freedomInstance = instance;
        return freedomInstance.getLastTokenId.call();
      }).then(async function(maxTokenId) {
  
      console.log("maxTokenId: " + maxTokenId)
      var songsRow = $('#elencoBraniInAccountContainer');
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
          // songTemplate.find('#ascoltaLaCanzone').attr('data-id', indice);
          //console.log(indice, songJson.name)
          
          var numAscolti = await App.getASong(freedomInstance.getAscolti(indice)).then(
            numAscolti => {
              return numAscolti;
          });

          songTemplate.find('#numAscolti').text(numAscolti);
          
          songsRow.append(songTemplate.html());
        
      }
    }).catch(function(err) {
      console.log(err.message);
    });

    // return App.bindEvents();
  },
  
  getASong(resultTokenURI) {

    return resultTokenURI.then((song) => {

        return JSON.parse(song)

    })

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
  