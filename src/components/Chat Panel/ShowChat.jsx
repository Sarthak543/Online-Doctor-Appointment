import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
export default function ShowChat() {
  const location = useLocation();
  const { appointmentNumber, person, name } = location.state;
  const [messages, setmessages] = useState([]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // getting all the appointment history
    async function getHistory() {
      try {
        const response = await fetch(
          `http://localhost:8010/getHistory/${appointmentNumber}`,
          {
            method: "get",
          }
        );

        const data = await response.json();
        setmessages(data);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }

    getHistory();

    setTimeout(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTo({
          top: messageContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column h-full"
        style={{ background: "rgba(0,0,0,0.1" }}
      >
        <div className="chat-header-bg text-light h-7">
          <p className="ms-5 pt-2 h-100 align-middle fs-5">
            <b>{person}</b>
          </p>
        </div>
        <div
          className=" h-89 overflow-auto"
          style={{ scrollbarWidth: "none" }}
          ref={messageContainerRef}
        >
          {messages.map((item, index) => {
            if (item.sender === person) {
              return (
                <div
                  key={index}
                  className=" p-4 border ms-2 mt-2 rounded-3  bg-light max-width-50"
                >
                  {item.message}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
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
              disabled
            />
            <button
              class="btn btn-secondary no-border"
              style={{ width: "150px" }}
              type="button"
              disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
