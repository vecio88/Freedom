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


      // console.log("initContract")
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
      console.log("getListaBrani", App.account.address)
     
      var freedomInstance;
      
      await App.contracts.Freedom.deployed().then(function(instance) {
        freedomInstance = instance;
        return freedomInstance.getLastTokenId.call();
      }).then(async function(maxTokenId) {

        // console.log("ciao" + maxTokenId)
        var songsRow = $('#elencoBraniInAccountContainer');
        var songTemplate = $('#songTemplate');

        for (i = 1; i <= maxTokenId; i++) {

          await freedomInstance.ownerOf(i).then(async anOwner => {
            // console.log(App.account.address, anOwner)
            if(anOwner == App.account.address) {
              let songJson = await freedomInstance.tokenURI(i).then(
                json => {
                  return JSON.parse(json)
                }, reason => {
                  // rejection
                  console.log("Num Elementi: " + maxTokenId, "Indice: " + indice)
                })
                // console.log(songJson)
                songTemplate.find('#imgCopertina').attr('src', songJson.attributes[0].copertina);
                songTemplate.find('#titoloBrano').text(songJson.name);
                songTemplate.find('#nomeAlbum').text(songJson.attributes[0].album);
                songTemplate.find('#description').text(songJson.description);
                
                var numAscolti = await App.getASong(freedomInstance.getAscolti(i)).then(
                  numAscolti => {
                    return numAscolti;
                });

                songTemplate.find('#numAscolti').text(numAscolti);
                
                songsRow.append(songTemplate.html());
            }
          });

        }
      
      }).catch(function(err) {
        console.log(err.message);
      });
      
     
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
  