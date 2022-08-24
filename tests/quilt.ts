import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, sendAndConfirmTransaction,Connection} from '@solana/web3.js'
import { BN } from "bn.js";
import { assert } from "chai";
import { Quilt } from "../target/types/quilt";

describe("quilt", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env()
  const network = "https://solana-devnet.g.alchemy.com/v2/lhsA_fYDYJ8rZYIasrLAgVHRzn0PP-EM";
  let connection = new Connection(network,'confirmed');

  const wallet = provider.wallet
  const program = anchor.workspace.Quilt as Program<Quilt>;

  let owner = anchor.web3.Keypair.generate()
  let attacker = anchor.web3.Keypair.generate()

  it('getting account funded',async() =>{

    const tx = await provider.connection.requestAirdrop(
      owner.publicKey,
      anchor.web3.LAMPORTS_PER_SOL*2
    )

    const latestBlockHash = await provider.connection.getLatestBlockhash()

    await provider.connection.confirmTransaction(
      {
        blockhash:latestBlockHash.blockhash,
        lastValidBlockHeight : latestBlockHash.lastValidBlockHeight,
        signature : tx
      }
    )
  })

  it('create PDA',async()=>{

    const [pointPDA,_] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("point"),
        owner.publicKey.toBuffer()
      ],
      program.programId
    )
      // console.log("Buffer :",wallet.publicKey.toBuffer())
      // console.log("publicKey : ",wallet.publicKey)
    try{
      let account = await program.account.point.fetch(pointPDA)
      console.log("already exist : ",account)
    }catch(err){
      
    const tx = await program.methods.createUser("First user","Second user")
    .accounts({
      authority:owner.publicKey,
      point: pointPDA
    }).signers([owner]).transaction()
    
    await sendAndConfirmTransaction(connection,tx,[owner])

    let account = await program.account.point.fetch(pointPDA)
    console.log(account)
    }
  })

  it("update the data with an attacker",async() =>{


      let [accountPDA,_] = await PublicKey.findProgramAddress([
        anchor.utils.bytes.utf8.encode("point"),
        owner.publicKey.toBuffer()
       ],program.programId)
        let account : any

      account = await program.account.point.fetch(accountPDA)
      console.log("old data",account)
       try{
      const tx = await program.methods.updateUser("first user updated","second user updated").accounts({
        authority:wallet.publicKey,
        point:accountPDA
      }).rpc()
    }catch(err){
      console.log("error : ",err.errorLogs)
    }
      // await sendAndConfirmTransaction(connection,tx,[owner])

      account = await program.account.point.fetch(accountPDA)
      console.log("updated data",account)
  })
  it("update the data with owner",async() =>{


    let [accountPDA,_] = await PublicKey.findProgramAddress([
      anchor.utils.bytes.utf8.encode("point"),
      owner.publicKey.toBuffer()
     ],program.programId)
      let account : any

    account = await program.account.point.fetch(accountPDA)
    console.log("old data",account)
     try{
    const tx = await program.methods.updateUser("first user updated","second user updated").accounts({
      authority:owner.publicKey,
      point:accountPDA
    }).signers([owner]).transaction()
      await sendAndConfirmTransaction(connection,tx,[owner])
      
    account = await program.account.point.fetch(accountPDA)
    console.log("updated data",account)
  }catch(err){
    console.log("error : ",err)
  }
})

});

// On solana mapping(address=> Point) doesn't happen like etherum because Solana uses different approach
// There will be different accounts (PDA) for every wallet associated with a wallet address for a program
// for every new user there will be a new associated PDA which will hold the data 
// In our case for 5 user there will be 5 PDA's that will be owned by the program
// We first need to find the PDA for wallet then fetch the data from the program for it.
// check above code to see it.

// https://www.anchor-lang.com/docs/pdas