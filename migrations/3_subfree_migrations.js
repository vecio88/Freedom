var Freedom= artifacts.require("Freedom");

module.exports = function(deployer) {
  deployer.deploy(Freedom); // , {value: "50000000000000000000"}
};