const Migrations = artifacts.require("Migrations");
const SocialMusic = artifacts.require("SocialMusic");

module.exports = function (deployer, net, acc) {
  deployer.deploy(Migrations);
  deployer.deploy(SocialMusic);
};
