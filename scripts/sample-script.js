
const hre = require("hardhat");


async function main() {
  const USElection = await hre.ethers.getContractFactory("USElection");
  const usElection = await USElection.deploy();
  await usElection.deployed();
  console.log("USElection deployed to:", usElection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
