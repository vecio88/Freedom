var CartellaClinica = artifacts.require("CartellaClinica");

module.exports = function(deployer) {
    deployer.deploy(CartellaClinica);
};