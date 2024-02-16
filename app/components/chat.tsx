"use client";

import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import {useChat, type Message} from "ai/react";

import useScroll from "../hooks/use-scroll";
import {useEffect, useRef} from "react";

function Chat({initialMessages}: {initialMessages?: Message[]}) {
  const {containerRef, scrollToBottom} = useScroll();
  const inputRef = useRef<HTMLInputElement>(null);

  const {messages, isLoading, input, handleInputChange, handleSubmit, stop} =
    useChat();

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="grid grid-cols-1 h-full px-4 lg:pl-[22%] lg:pr-[28%] py-6 sm:py-12">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="absolute flex flex-col w-full h-full">
          <ChatMessages messages={messages} containerRef={containerRef} />
          <ChatInput
            isLoading={isLoading}
            hasMessages={Boolean(messages.length > 0)}
            inputRef={inputRef}
            onInputChange={handleInputChange}
            value={input}
            onStop={stop}
          />
        </div>
      </form>
    </div>
  );
}

export default Chat;
