// import Web3 from "web3";
// import contractABI from "../contract/contractABI.json";

// const contractAddress = "0x5926aea610751251BAb83b0a717D69ee7F964f37";

// let web3;
// let contract;

// // This will ensure the code only runs in the browser, not during server-side rendering
// if (typeof window !== "undefined") {
//   // Check if window.ethereum exists before trying to use it
//   if (window.ethereum) {
//     web3 = new Web3(window.ethereum);
//     contract = new web3.eth.Contract(contractABI, contractAddress);
//   } else {
//     console.log("MetaMask is not installed");
//   }
// } else {
//   // This code runs during server-side rendering
//   console.log("Running on server side - Web3 not initialized");
// }

// export { web3, contract };


import Web3 from "web3";
import contractABI from "../contract/contractABI.json";

const contractAddress = "0x5926aea610751251BAb83b0a717D69ee7F964f37";
const infuraUrl = "https://sepolia.infura.io/v3/12fb888867724956b930449cf10fc4e8";  // Replace with your Infura URL
const privateKey = "33b5deb26cc43522d0b3e040dd9a9050342017f4495f5a00c8b267962b97ff99"; // ⚠️ NEVER EXPOSE THIS PUBLICLY ⚠️

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
const contract = new web3.eth.Contract(contractABI, contractAddress);
const fixedWalletAddress = "0xc49e90EFcE01F841573959Fc1b6BA4CFf3a4e344"; // Replace with the wallet that pays gas

export { web3, contract, privateKey, fixedWalletAddress };
