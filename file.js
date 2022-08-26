const web3 = require("@solana/web3.js")

// get the connection
const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))


async function getBalance(address){

    // don't send wallet address as string so convert it into public key object first
    let pubkey = new web3.PublicKey(address)
    let bal = await connection.getBalance(pubkey)
    console.log(bal/(web3.LAMPORTS_PER_SOL), "SOL")
}

async function main(){

        let keypair = web3.Keypair.generate()
        
        // get airdrop of 2 sol

        // creating a transaction
        let tx = await connection.requestAirdrop(
            keypair.publicKey,
            web3.LAMPORTS_PER_SOL*2

        )

        const latestBlockHash = await connection.getLatestBlockhash()

        await connection.confirmTransaction({
            blockhash:latestBlockHash.blockhash,
            lastValidBlockHeight : latestBlockHash.lastValidBlockHeight,
            signature : tx
        })

        // generating new keypair

        let _keypair = web3.Keypair.generate()

        let _tx = web3.SystemProgram.transfer({
            fromPubkey : keypair.publicKey,
            toPubkey : _keypair.publicKey,
            lamports : web3.LAMPORTS_PER_SOL*1
        })

        let transaction = new web3.Transaction()
        transaction.add(_tx)

        await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [keypair]
        )

        console.log("account balance of : ", keypair.publicKey, await getBalance(keypair.publicKey))
        console.log("account balance of : ", _keypair.publicKey, await getBalance(_keypair.publicKey))


}

async function getTransactionHistory(address){

    let addr = new web3.PublicKey(address)

    let txns = await connection.getSignaturesForAddress(addr,{limit:10})
    console.log(txns)
}

getTransactionHistory('AH9G5pRhxdD3UARFVD38sT4djAvp8MuMGSbQLwbpM3Bo')