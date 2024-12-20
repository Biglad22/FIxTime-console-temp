//claim token 
// import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
// import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const connectWallet = async () => {
    try {
        if('solana' in window){

            const solana = window.solana;
            const res = await solana.connect();

            const walletAddress = await res.publicKey.toString();
            localStorage.setItem("connectedWallet", walletAddress);
            
            return walletAddress

        }else throw new Error('please install a solana wallet');
        

    } catch (error) {
        throw new Error(error)
    }
}


///handles reconnection to wallet
export async function checkConnection() {

    const savedWallet = localStorage.getItem("connectedWallet");///check if user has a solana wallet connected

    if (savedWallet && window.solana) {
        try {
            const walletResponse = await window.solana.connect({ onlyIfTrusted: true });
            const walletAddress = await walletResponse.publicKey.toString();

            return walletAddress;

        } catch (error){ throw new Error(error) }
    }

}

///handles reconnection to wallet
export async function disconnectWallet() {
    try {
        if (window.solana) {
            await window.solana.disconnect();
            console.log("Wallet disconnected");
  
            // Remove wallet info from localStorage
            localStorage.removeItem("connectedWallet");
        }
    } catch (error) {throw new Error(error)};

}
  



// export const claimTokens = async (walletAddress, amount) => {
//     try {
//         const connection = new Connection('https://api.mainnet-beta.solana.com');
//         const senderWallet = new PublicKey(walletAddress);
//         const tokenMintAddress = new PublicKey('<TokenMintAddress>'); // Replace with your token mint address
//         const recipientAddress = new PublicKey(walletAddress); // The recipient is the user's wallet

//         // Get the token account of the sender (if any)
//         const senderTokenAccount = await Token.getAssociatedTokenAddress(
//             TOKEN_PROGRAM_ID,
//             tokenMintAddress,
//             senderWallet
//         );

//         // Transaction to send tokens
//         const transaction = new Transaction().add(
//             Token.createTransferInstruction(
//                 TOKEN_PROGRAM_ID,
//                 senderTokenAccount,
//                 recipientAddress,
//                 senderWallet,
//                 [],
//                 amount  // Amount of tokens to send (in smallest unit, e.g., lamports for SOL or token decimals)
//             )
//         );

//         // Send the transaction
//         const { signature } = await connection.sendTransaction(transaction, [senderWallet], {
//             skipPreflight: false,
//             preflightCommitment: 'processed',
//         });

//         console.log("Transaction signature:", signature);
//         return signature;  // Return the transaction signature to confirm the claim
//     } catch (error) {
//         console.error("Error claiming tokens:", error);
//         alert("Failed to claim tokens.");
//     }
// };
