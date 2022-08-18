import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey } from '@solana/web3.js'
import { BN } from "bn.js";
import { assert } from "chai";
import { Quilt } from "../target/types/quilt";

describe("quilt", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env()

  const wallet = provider.wallet
  const program = anchor.workspace.Quilt as Program<Quilt>;


  it('create PDA',async()=>{
    const [pointPDA,_] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("point"),
        wallet.publicKey.toBuffer()
      ],
      program.programId
    )

    try{
      let account = await program.account.point.fetch(pointPDA)
      console.log("already exist : ",account)
    }catch(err){
      
    await program.methods.createUser("First user","Second user")
    .accounts({
      user:wallet.publicKey,
      point: pointPDA
    })
    .rpc()

    let account = await program.account.point.fetch(pointPDA)
    console.log(account)
    }
  })

  it("update the data",async() =>{

      let [accountPDA,_] = await PublicKey.findProgramAddress([
        anchor.utils.bytes.utf8.encode("point"),
        wallet.publicKey.toBuffer()
      ],program.programId)
      let account : any

      account = await program.account.point.fetch(accountPDA)
      console.log("old data",account)

      await program.methods.updateUser("first user updated","second user updated")

      account = await program.account.point.fetch(accountPDA)
      console.log("updated data",account)
  })

  it("update the one data ",async() =>{

    let [accountPDA,_] = await PublicKey.findProgramAddress([
      anchor.utils.bytes.utf8.encode("point"),
      wallet.publicKey.toBuffer()
    ],program.programId)
    let account : any

    account = await program.account.point.fetch(accountPDA)
    console.log("old data",account)

    await program.methods.updateOne("first user updated third time")

    account = await program.account.point.fetch(accountPDA)
    console.log("updated data",account)
})
  // it("set data", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.setData(new anchor.BN("45"))
  //   .accounts({
  //     myAccount:acc.publicKey,
  //     user: provider.wallet.publicKey,
  //     systemProgram : anchor.web3.SystemProgram.programId
  //   }).
  //   signers([acc])
  //   .rpc()

  //   const account = await program.account.myAccount.fetch(acc.publicKey);
  //   assert.ok(account.data.eq(new BN("45")))

  // });

  // it("update the account",async() =>{
    
  //     await program.methods.updateData(new BN("4589")).accounts({
  //       myAccount : acc.publicKey
  //     })

  //     const account = await program.account.myAccount.fetch(acc.publicKey);

  //     assert.ok(account.data.eq(new BN("45")))

  // })
});

// On solana mapping(address=> Point) doesn't happen like etherum because Solana uses different approach
// There will be different accounts (PDA) for every wallet associated with a wallet address for a program
// for every new user there will be a new associated PDA which will hold the data 
// In our case for 5 user there will be 5 PDA's that will be owned by the program
// We first need to find the PDA for wallet then fetch the data from the program for it.
// check above code to see it.
