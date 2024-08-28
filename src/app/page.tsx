"use client";

import {useEffect, useRef} from "react";
import { useChat } from "ai/react";
import SendIcon from "./SendIcon";

export default function Chat() {
  const  messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

  return (
    <section className="flex justify-end items-center h-[98vh]">
      <form onSubmit={handleSubmit} className=" h-[90%] rounded-md bg-gray-100 max-w-xl w-full mx-2">
        <div className="text-white h-full overflow-y-auto px-3 scrollbar-thick">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col m-2 p-2 rounded-md ${
                m.role === "assistant"
                  ? "self-end bg-gray-800"
                  : "self-start bg-blue-700"
              }`}
            >
              <span
                className={`text-xs ${
                  m.role === "assistant" ? "text-right" : "text-left"
                }`}
              >
                {m.role}
              </span>{" "}
              {m.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center text-black bg-slate-300 px-3 py-2 w-full rounded-md">
        <input placeholder="Type something..." autoFocus className="text-black bg-slate-100 px-2 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 flex justify-between" onChange={handleInputChange} value={input} />
        <button
            type="button"
            onClick={() => {
              if (input.trim()) {
                handleSubmit({
                  preventDefault: () => {},
                } as React.FormEvent<HTMLFormElement>);
              }
            }}
            className="ml-2"
            disabled={isLoading || !input.trim()}
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  );
}
