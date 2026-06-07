import { NextResponse } from "next/server";
import Web3 from "web3";
import contractABI from "../../../contract/contractABI.json";

const web3 = new Web3("https://sepolia.infura.io/v3/12fb888867724956b930449cf10fc4e8"); // Replace with actual Infura URL
const contractAddress = "0x5926aea610751251BAb83b0a717D69ee7F964f37";
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Private key of your wallet (🔴 NEVER expose in frontend)
const privateKey = "0x33b5deb26cc43522d0b3e040dd9a9050342017f4495f5a00c8b267962b97ff99"; 
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

export async function POST(req) {
    try {
        const { medicineName, genericName, rating, reviewText } = await req.json();

        const tx = contract.methods.submitReview(medicineName, genericName, rating, reviewText);
        const gas = await tx.estimateGas({ from: account.address });
        const gasPrice = await web3.eth.getGasPrice();

        const txData = {
            from: account.address,
            to: contractAddress,
            gas,
            gasPrice,
            data: tx.encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        return NextResponse.json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
