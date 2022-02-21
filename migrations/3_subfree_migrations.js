var Freedom= artifacts.require("Freedom");

module.exports = function(deployer) {
  deployer.deploy(Freedom, {value: "20000000000000000000"}); // , {value: "50000000000000000000"}
};