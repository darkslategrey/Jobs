const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("--------------------------------------");
  arguments = [];
  const Job = await deploy("Job", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //Verify the smart contract
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
    log("Verifying...");
    await verify(Job.address, arguments);
  }
};

module.exports.tags = ["all", "job", "main"];
