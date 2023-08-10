const Migrations = artifacts.require("relievingLetter");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
