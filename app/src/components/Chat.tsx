import { useState } from "react";
import global from "../assets/global.png";
import { user, getIndex } from "../utils/gunacc";
import pic from "../assets/pic.png";
import video from "../assets/video.png";
import file from "../assets/file.png";
import download from "../assets/download.png";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { upload, retrieve, Download } from "./web3";
const path : any = user
  .get("/orbitdb/zdpuB3Hq67P1fd2C6EBVGFH2qT3fCHYwHD1Tv5Rnjx5TW8jN3")
  .get("global");

export default function Chat() {
  const { publicKey, sendTransaction } = useWallet();
  const [acc, setAcc] = useState(false);
  const [display, setDisplay] = useState(false);
  let account : any = publicKey;
  const index = getIndex();

  async function isAccount() {
    account = publicKey;
    if (publicKey) {
      setAcc(true);
      clearInterval(isLogged);
    }
  }
  function scroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  }

  const isLogged = setInterval(isAccount, 500);
  let show;
  function OpenForm() {
    if (display === false) {
      let ele:any = document.getElementById("myForm")
      ele.style.display = "block";
      setDisplay(true);
      Display();
      setTimeout(scroll, 1000);
      let input:any = document.getElementById("input");
      input.addEventListener("keydown", function (e:any) {
        if (e.code === "Enter") {
          globalChat();
        }
      });
      // show = setInterval(Display, 1000);
    } else {
      closeForm();
    }
  }

  function closeForm() {
    let ele: any = document.getElementById("myForm")
    ele.style.display = "none";
    // clearInterval(show);
    setDisplay(false);
  }

  // add msgs to gun
  async function globalChat() {
    let input : any = document.getElementById("input");
    let text;
    if (input.value === "") {
      return;
    } else {
      text = input.value;
    }

    // let index = d.toISOString();
    const d = new Date().getTime();
    const messageData = {
      name: account,
      message: text,
      createdAt: d,
      type: "txt",
    };
    let metadata = JSON.stringify(messageData);

    path.get(index).set(metadata);
    input.value = "";
    scroll();
  }

  //get msgs from gun
  let diff = 1;
  let Name : any= [],
    Message :any = [],
    CreatedAt : any = [],
    Type : any= [];

  //load previous msgs
  function load() {
    let i = index - diff;
    let msg : any = [],
      nam : any= [],
      created :any= [],
      typ:any = [];
    path
      .get(i)
      .map()
      .once(function (data:any, key:any) {
        if (data !== undefined) {
          try {
            data = JSON.parse(data);
            nam.push(data.name);
            msg.push(data.message);
            created.push(data.createdAt);
            typ.push(data.type);
          } catch (err) {
            console.log(err);
          }
        }
      });
    diff = diff + 1;
    Message = msg.concat(Message);
    Name = nam.concat(Name);
    CreatedAt = created.concat(CreatedAt);
    Type = typ.concat(Type);
    // console.log(Message);
    // if ((message.length = 0)) {
    //   load();
    // }
    Display();
  }

  function getMsg(index:any) {
    path
      .get(index)
      .map()
      .once(function (data:any, key:any) {
        if (data !== undefined) {
          try {
            data = JSON.parse(data);
            Name.push(data.name);
            Message.push(data.message);
            CreatedAt.push(data.createdAt);
            Type.push(data.type);
          } catch (err) {
            console.log(err);
          }

          if (display === true) {
            Display();
          }
        }
      });
  }

  //add msgs to html
  const Display = async () => {
    let ele:any = document.getElementById("txt")
    ele.innerHTML = "";
    if (Name.length > 0) {
      for (let i = 0; i < Message.length; ++i) {
        let datetime = new Date(CreatedAt[i]);
        if (Type[i] == "txt") {
          let txtmsg : any = document.createElement("div");
          txtmsg.innerHTML = `<h4>${Message[i]}</h4><h6 style="color:grey;">
              ${Name[i]}<br />${datetime}</h6><br/><br/>`;
            ele = document.getElementById("txt")
          ele.appendChild(txtmsg);
        } else if (Type[i] == "file") {
          let dwnload = document.createElement("a");
          dwnload.type = "button";
          dwnload.innerHTML = `<img src=${download} height="200px" alt=""/>`;
          dwnload.onclick = () => Download(Message[i]);
          ele.appendChild(dwnload);
          let frm = document.createElement("div");
          frm.innerHTML = `<br /><h6 style="color:grey;">${Name[i]}<br />${datetime}</h6><br/><br/>`;
          ele.appendChild(frm);
        }
      }
    } else {
      console.log("pls load previous msgs");
    }
    scroll();
  };
  getMsg(index);

  if (acc === false) {
    return (
      <div className="notConnected">
        <h1>Please connect wallet to continue...</h1>;
      </div>
    );
  } else {
    return (
      <div>
        <img 
          src={global}
          className="open-button"
          onClick={() => OpenForm()}
          alt=""
        />
        <div className="chat-popup" id="myForm">
          <header id="heading" className="heading">
            <h1>Global Chat</h1>
          </header>
          <button
            className="button"
            type="button"
            onClick={() => load()}
            id="load"
          >
            load previous messages
          </button>
          <div className="chats" id="chats">
            <div id="txt"></div>
          </div>
          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="txt-input"
              type="text"
              placeholder="Write something..."
              id="input"
            />

            <input
              type="button"
              className="button"
              onClick={() => globalChat()}
              value="Send"
              id="send"
            />

            <button
              type="button"
              className="button"
              onClick={() => closeForm()}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    );
  }
}
