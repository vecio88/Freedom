
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
        return App.getListaBrani();
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
            var songsRow = $('.elencoBraniContainerClassifica');
            var songTemplate = $('#songTemplateClassifica');

            var listOfSong = [];

            for (i = 1; i <= maxTokenId; i++) {
                listOfSong.push(await freedomInstance.tokenURI(i).then(
                    async json => {
                        songJsonTmp = JSON.parse(json);

                        var numAscolti = await freedomInstance.getAscolti(i).then(
                            numAscolti => {
                                return numAscolti + "";
                            });

                        var owner = await freedomInstance.ownerOf(i).then(address => {
                            return address;
                        })

                        songJsonTmp.ascolti = numAscolti
                        songJsonTmp.owner = owner

                        return songJsonTmp
                    }, reason => {
                        // rejection
                        console.log("Num Elementi: " + maxTokenId, "Indice: " + indice)
                    }))
            }

            // console.log(listOfSong)

            listOfSong.sort(a => {return -a.ascolti}).map(songJson => {

                songTemplate.find('#imgCopertina').attr('src', songJson.attributes[0].copertina);
                songTemplate.find('#titoloBrano').text(songJson.name);
                songTemplate.find('#nomeAlbum').text(songJson.attributes[0].album);
                songTemplate.find('#ownerSong').text(songJson.owner);
                songTemplate.find('#numAscolti').text(songJson.ascolti);
                songsRow.append(songTemplate.html());
            })

        }).catch(function(err) {
        console.log(err.message);
        }); 

    return App.bindEvents();
  },

  handlePagamentoCompenso: async function() {
    await App.contracts.Freedom.deployed().then(function(instance) {
        freedomInstance = instance;

        freedomInstance.pagamentoClassifica.call();
    });
  },

    // Bind degli eventi 
  bindEvents: function() {
      // console.log("bindEvents")
      $(document).on('click', '#pagaCompensi', App.handlePagamentoCompenso);
  }
  
  };

  
$(function() {
    $(window).load(function() {
        App.initWeb3();
    });
});

