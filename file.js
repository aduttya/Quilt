const web3 = require("@solana/web3.js")

// get the connection
// const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))
const connection = new web3.Connection('https://solana-mainnet.g.alchemy.com/v2/nwxElf1ZkLWEf6AJeytuBV_2EWyxk3vu')

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

// async function parseTransaction()
async function getTransactionHistory(address){

    let addr = new web3.PublicKey(address)

    let txns = await connection.getSignaturesForAddress(addr,{limit:1})
    let txnList = txns.map(transaction => transaction.signature)
    console.log(txnList.length)
    let txDetails = await connection.getParsedTransactions(txnList)
    // console.log(txDetails)
    let accountKeys = txDetails[0].transaction.message
    let preAccountBalance = txDetails[0].meta.preBalances
    let postAccountBalance = txDetails[0].meta.postBalances
   
    console.log(txDetails)
    for(let i = 0; i < preAccountBalance.length; ++i){
        // if(preAccountBalance[i]-postAccountBalance[i] !== 0){
        console.log(accountKeys.accountKeys[i].pubkey.toString()," ",preAccountBalance[i]/web3.LAMPORTS_PER_SOL,", ",postAccountBalance[i]/web3.LAMPORTS_PER_SOL)
    // }
}
    // txDetails.forEach((transaction,i)=>{
    //     // console.log(transaction.transaction.message.accountKeys)
    //     transaction.transaction.message.accountKeys.forEach((obj) =>{
    //         console.log(obj)
    //     })
    //     console.log("Post Balance : ",transaction.meta.postBalances)
    //     console.log("Pre Balance : ",transaction.meta.preBalances)

    // })


}

getTransactionHistory('CnALr1bMBnvvxhjvUJ22Ud2CkkNYe7ZiCuDHuw167zYU')