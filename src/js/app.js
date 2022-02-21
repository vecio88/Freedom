App = {
  web3Provider: null,
  contracts: {},
  
  account : {
    address : null,
    balance: 0
  },

  /*init: async function() {
    // Load pets.
    $.getJSON('pets.json', function(data) {
      var petsRow = $('#elencoBraniContainer');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

   // return await App.initWeb3();
  },*/

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
    
    $.getJSON('../build/contracts/Subfree.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var SubfreeArtifact = data;
      App.contracts.Subfree = TruffleContract(SubfreeArtifact);

      // console.log(App.contracts.Subfree)
      // Set the provider for our contract
      App.contracts.Subfree.setProvider(App.web3Provider);
      
      // Use our contract to retrieve and mark the adopted pets
      return getDatiAccount();
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
      // document.getElementById("pubkey").setAttribute("value", self.account.address);
      console.log(self.account.address)
      
      //web3.eth.getBalance(self.account.address, function(error, ether) {
        // c : coefficients / significand
        // e : exponent
        // s : sign


        //console.log(ether)
      //});
        });

  


  },

   addBrano: async function(accountFrom, jsonBrano) {
    console.log(jsonBrano)

    await App.contracts.Subfree.deployed().then(function(instance) {
      subfreeInstance = instance;
     
      // Execute adopt as a transaction by sending account
      return  subfreeInstance.addCanzone(jsonBrano, {from: accountFrom, gas: 6721975, gasPrice: '30000000'});
        }).then(function(result) {
          return true;
        }).catch(function(err) {
          console.log(err.message);
          return false;
        });
  },

  getListaBrani: async function() {
    console.log("getListaBrani")
   
    var subfreeInstance;

    // deployed crea l'istanza che comunica con lo Smart Contract
    await App.contracts.Subfree.deployed().then(function(instance) {
      subfreeInstance = instance;

    return subfreeInstance.getLastTokenId.call();
  }).then(function(maxTokenId) {

    console.log("maxTokenId: " + maxTokenId)
    
    for (i = 0; i < maxTokenId; i++) {
      console.log(subfreeInstance.tokenURI(i))
      //   $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);

    }
  }).catch(function(err) {
    console.log(err.message);
  });
},

  handleAdopt: function(event) {
    console.log("bindEvents");
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  // Bind degli eventi 
  bindEvents: function() {
    console.log("bindEvents")
    $(document).on('click', '.btn-ins-song', App.handleAdopt);
  }

};

$(function() {
  $(window).load(function() {
    // App.initWeb3();
  });
});
