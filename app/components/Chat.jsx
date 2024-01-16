"use client";

import { genChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuArrowUpSquare } from "react-icons/lu";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { mutate, isPending } = useMutation({
    mutationFn: (query) => genChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? "🙂" : "🤖";
          const bg = role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={`${bg} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-5">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <p className="text-sm italic px-2 py-1 inline-block border-l-4 border-yellow-500 mb-4">
          This AI model was prompt engineered to only answer marketing related
          questions.
        </p>
        <div className="join w-full">
          <input
            type="text"
            placeholder="Ask question..."
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              "Working..."
            ) : (
              <LuArrowUpSquare className="text-2xl" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
