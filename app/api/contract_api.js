import { web3, contract, privateKey, fixedWalletAddress } from "../../utils/web3";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST requests allowed" });
    }

    try {
        const { medicineName, rating, reviewText } = req.body;

        // Prepare transaction data
        const tx = {
            from: fixedWalletAddress,
            to: contract.options.address,
            data: contract.methods.submitReview(medicineName, rating, reviewText).encodeABI(),
            gas: 3000000,
        };

        // Sign the transaction with the fixed wallet's private key
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        return res.status(200).json({ success: true, transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error("Error submitting review:", error);
        return res.status(500).json({ error: error.message });
    }
}
