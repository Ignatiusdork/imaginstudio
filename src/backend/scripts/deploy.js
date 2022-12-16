const {
    Client,
    AccountId,
    PrivateKey,
    ContractCreateFlow,
} = require('@hashgraph/sdk');

require('dotenv').config();
const fs = require('fs');

// Get operator from .env file
const operatorKey = PrivateKey.fromString(process.env.PRIVATE_KEY);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);
 
// Marketplace Instance
async function contractDeployFcn(bytecode, gasLim, feePercent) {
	const contractCreateTx = new ContractCreateFlow().setBytecode(bytecode).setGas(gasLim).setConstructorParams(new Uint(feePercent));
	const feePercent = 1;
	const contractCreateSubmit = await contractCreateTx.execute(client);
	const contractCreateRx = await contractCreateSubmit.getReceipt(client);
	const contractId = contractCreateRx.contractId;
	const contractAddress = contractId.toSolidityAddress();
	return [contractId, contractAddress];
}

// NFT Instance
async function contractDeployFcn(bytecode, gasLim) {
	const contractCreateTx = new ContractCreateFlow().setBytecode(bytecode).setGas(gasLim);
	const contractCreateSubmit = await contractCreateTx.execute(client);
	const contractCreateRx = await contractCreateSubmit.getReceipt(client);
	const ncontractId = contractCreateRx.ncontractId;
	const ncontractAddress = ncontractId.toSolidityAddress();
	return [ncontractId, ncontractAddress];
}

const main = async () => {

	// Read the bytecode of the contract from the compiled artifacts
	const json = JSON.parse(fs.readFileSync('./artifacts/src/backend/contracts/Marketplace.sol/Marketplace.json'));
	const njson = JSON.parse(fs.readFileSync('./artifacts/src/backend/contracts/NFT.sol/NFT.json'));

    const contractBytecode = json.bytecode;
	const ncontractBytecode = njson.bytecode;
	
	console.log('\n- Deploying contract...');
	const gasLimit = 1000000;
    const feePercent = 1;

	// Deploy the contracts
	const [contractId, contractAddress] = await contractDeployFcn(contractBytecode, gasLimit, feePercent);
	const [ncontractId, ncontractAddress] = await contractDeployFcn(ncontractBytecode, gasLimit);
	
	console.log(` Marketplace Contract created with ID: ${contractId} / ${contractAddress}`);
	console.log(` Marketplace Contract created with ID: ${ncontractId} / ${ncontractAddress}`);
	
};

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});

























// const { ethers } = require("hardhat");

// async function main() {
//     const [deployer] = await ethers.getSigners();
  
//     console.log("Deploying contracts with the account:", deployer.address);
//     console.log("Account balance:", (await deployer.getBalance()).toString());
  
//     // Get the ContractFactories and Signers here.
//     const NFT = await ethers.getContractFactory("NFT");
//     const Marketplace =  await ethers.getContractFactory("Marketplace");
//     // deploy contracts
//     const nft = await NFT.deploy();
//     const marketplace = await Marketplace.deploy(1);

//     console.log("NFT contract address", nft.address)
//     console.log("Marketplace address", marketplace.address)

//     // Save copies of each contracts abi and address to the frontend.
//     saveFrontendFiles(marketplace, "Marketplace");
//     saveFrontendFiles(nft , "NFT");
//   }
  
//   function saveFrontendFiles(contract, name) {
//     const fs = require("fs");
//     const contractsDir = __dirname + "/../../frontend/contractsData";
  
//     if (!fs.existsSync(contractsDir)) {
//       fs.mkdirSync(contractsDir);
//     }
  
//     fs.writeFileSync(
//       contractsDir + `/${name}-address.json`,
//       JSON.stringify({ address: contract.address }, undefined, 2)
//     );
  
//     const contractArtifact = artifacts.readArtifactSync(name);
  
//     fs.writeFileSync(
//       contractsDir + `/${name}.json`,
//       JSON.stringify(contractArtifact, null, 2)
//     );
//   }




 






