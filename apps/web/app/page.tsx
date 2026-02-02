"use client";

import classes from "./page.module.css";
import { useSocket } from "./context/socketProvider";
import { useState } from "react";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          type="text"
          placeholder="Message"
        />

        <button
          onClick={() => {
            if (!message.trim()) return;
            sendMessage(message);
            setMessage("");
          }}
          className={classes["button"]}
        >
          Send
        </button>
      </div>

      <ul>
        {messages.map((msg, i) => (
          <li key={`${msg}-${i}`}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
