import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./styles/App.css";
import user from "../../api/user";
import Navbar from "../general/Navbar";

// let socket;

// if(window.location.href === "https://one-call-away.herokuapp.com/voice_call")
// {
//   socket = io("https://one-call-away.herokuapp.com");
// }

//const socket = io(`https://one-call-away.herokuapp.com`);

let socket;
let connected = false;

function VoiceCall() {

  if(window.location.href === "https://one-call-away.herokuapp.com/voice_call" && connected === false)
  {
     socket = io("https://one-call-away.herokuapp.com");
     connected = true;
  }

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    //alert(socket.connected + ": " + socket.id)

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
      navigator.clipboard.writeText(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      // close socket on unmount
      socket.close();
      window.location.reload(true);
    }
  }, []);

  const turnOffMic = () => {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
  };

  const turnOffVid = () => {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
  };

  const newCallKey = () => {
    window.location.reload(true);
  }

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload(true);
  };

  const createLog = (id) => {
    user.post("/call/CreateCallLog", {
      call_id:id
    })
    .then(res => {console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
  };
  const addtoLog = () => {
    user.patch("/call/AddUsertoLog", {
      call_id:socket.id
    })
    .then(res => {console.log(`statusCode: ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error.response)
    })
  };

  const navItems = [
    {
      title: "Sign In",
      path: "/signin"
    }
  ];

  return (
    <div className="vc_bg_color">
      <Navbar navItems={navItems} />
      <br></br>
      <h1 style={{ textAlign: "center", color: "#EEEEEE", fontSize: "70px" }}>
        One Call Away
      </h1>
      <br></br>
      <div className="myId">
        <CopyToClipboard text={socket.id} style={{ marginBottom: "2rem" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AssignmentIcon fontSize="large" />}
          >
            Copy ID
          </Button>
        </CopyToClipboard>
        <TextField
          id="filled-basic"
          label="ID to call"
          variant="filled"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <div className="call-button">
          {callAccepted && !callEnded ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveCall}
              style={{ margin: "20px" }}
            >
              Leave Call
            </Button>
          ) : (
            <IconButton
              color="primary"
              aria-label="call"
              onClick={() => {createLog(idToCall);callUser(idToCall)}}
            >
              <PhoneIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <div className="video-settings">
          <div>
            <IconButton
              color="primary"
              aria-label="turnOffMic"
              onClick={() => turnOffMic()}
              style={{
                marginTop: "10px",
                borderRadius: "20px",
                border: "1px solid",
              }}
            >
              <h1 style={{ fontSize: "20px" }}>Toggle Audio</h1>
            </IconButton>
          </div>
          <div>
            <IconButton
              color="primary"
              aria-label="turnOffVid"
              onClick={() => turnOffVid()}
              style={{
                marginTop: "10px",
                marginBottom: "-5px",
                borderRadius: "20px",
                border: "1px solid",
              }}
            >
              <h1 style={{ fontSize: "20px", }}>Toggle Video</h1>
            </IconButton>
          </div>
          <div>
            <IconButton
              color="primary"
              aria-label="newCallKey"
              onClick={() => newCallKey()}
              style={{
                marginTop: "40px",
                borderRadius: "20px",
                borderColor: "#393E46",
                border: "1px solid",
              }}
            >
              <h1 style={{ fontSize: "25px", color: "#393E46" }}>Generate New Call ID</h1>
            </IconButton>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                id="vid1"
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "650px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                id="vid2"
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "650px" }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <br></br>
      <div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>A person is calling...</h1>
            <Button variant="contained" color="primary" onClick={()=>{answerCall();addtoLog()}}>
              Answer
            </Button>
          </div>
        ) : null}
      </div>
      <br></br>
    </div>
  );
}

export default VoiceCall;
