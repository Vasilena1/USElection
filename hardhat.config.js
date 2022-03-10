require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-testnets", "Deploys contract on a provided network")
  .setAction(async () => {
    const deployElectionContract = require("./scripts/deploy");
    await deployElectionContract();
});


subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
      console.log(taskArgs.message);
      await hre.run('print', { message: "Done!" })
});

task("deploy-mainnet", "Deploys contract on a provided network")
.addParam("privateKey", "Please provide the private key")
.setAction(async ({privateKey}) => {
    const deployElectionContract = require("./scripts/deploy-with-param");
    await deployElectionContract(privateKey);
});

module.exports = {
  network: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
      accounts: ['40c2813049e44ec79cb4d7e0d18de173']
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  //npx hardhat verify --network ropsten "0x26391Bd12b4A32521B9ABfC9D1DE5A794D6B172A" => Error HH100: Network ropsten doesn't exist
  etherscan: {
    apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY" //2A3TKIR6YZ3HAV3M3JF7PGXTGI1SA7PNBR
  }
};
//https://github.com/vasilena-milchova/USElection.git