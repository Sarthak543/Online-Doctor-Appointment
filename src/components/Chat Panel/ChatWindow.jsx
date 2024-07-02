import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWebSocket } from "./WebSocketContext";

export default function ChatWindow() {

  const location = useLocation();
  const { item,name,heading } = location.state;
  // const name = 
  const { stompClient } = useWebSocket();
  const [messages, setmessages] = useState([]);
  const messageContainerRef = useRef(null);
  const i = 0

  useEffect(() => {
    console.log(item,i+1)
    if (stompClient) {
      console.log("subscribing to topic");
      stompClient.subscribe("/chat/return-to", (response) => {
        const message = JSON.parse(response.body);
        console.log("This is the message i received " + message);
        setmessages((prevMessages) => [...prevMessages, message]);
      });
    } else {
      console.clear();
      console.log("Subscribing error");
    }

    setTimeout(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTo({
          top: messageContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, [stompClient]);

  const send = () => {
    let text = document.getElementById("message").value
    // document.getElementById("message").value=''
    if(text.length>0){
      console.log(item)
      let temp = {
        // id: i+1,
        sender: name,
        message: document.getElementById("message").value,
        appointment:item
      }
      // Broadcast logic
      stompClient.send("/app/message",{},JSON.stringify(temp))
      //
      setTimeout(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTo({
            top: messageContainerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column h-full"
        style={{ background: "rgba(0,0,0,0.1" }}
      >
        <div className="chat-header-bg text-light h-7">
          <p className="ms-5 pt-2 h-100 align-middle fs-5">
            <b>{heading}</b>
            <b>{item.appointmentNumber}</b>
          </p>
        </div>
        <div
          className=" h-89 overflow-auto"
          style={{ scrollbarWidth: "none" }}
          ref={messageContainerRef}
        >
          {messages.map((item) => {
            if (item.sender !== name) {
              return (
                <div className=" p-4 border ms-2 mt-2 rounded-3  bg-light max-width-50">
                  {item.message}
                </div>
              );
            } else {
              return (
                <div
                  className=" p-4 border mt-2 me-2 rounde-3 max-w-50 margin-left-50"
                  style={{ background: "rgba(226,255,199,255)" }}
                >
                  {item.message}
                </div>
              );
            }
          })}
        </div>
        <div
          className="h-bottom border border-secondary"
          style={{ overflowX: "hidden", overflowY: "hidden" }}
        >
          <div class="input-group h-bottom">
            <input
              type="text"
              class="form-control no-border"
              id="message"
              placeholder="Recipient's username"
              aria-label="Recipient's username with two button addons"
            />
            <button
              class="btn btn-secondary no-border"
              style={{ width: "150px" }}
              type="button"
              onClick={send}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
