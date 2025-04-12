"use client";

import React from "react";
import { motion } from "framer-motion";
import { useChatLogic } from "@/hooks/use-chat-logic";
import WelcomeScreen from "./chat/welcome-screen";
import ConversationScreen from "./chat/conversation-screen";
import ChatInput from "./chat/chat-input";

/**
 * チャットボックスコンポーネント
 * チャットUIの全体を構成する
 */
const Chatbot = () => {
  const {
    input,
    setInput,
    conversation,
    isLoading,
    hasStartedChat,
    messageEndRef,
    inputRef,
    handlePromptClick,
    handleSend,
  } = useChatLogic();

  return (
    <div className="relative h-full flex flex-col items-center">
      {/* メッセージコンテナ */}
      <div className="flex-1 w-full max-w-3xl px-4">
        {!hasStartedChat ? (
          <WelcomeScreen onPromptClick={handlePromptClick} />
        ) : (
          <ConversationScreen
            conversation={conversation}
            input={input}
            messageEndRef={messageEndRef}
          />
        )}
      </div>

      {/* 入力コンテナ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          position: hasStartedChat ? "fixed" : "relative",
        }}
        className="w-full bg-gradient-to-t from-white via-white to-transparent pb-4 pt-6 bottom-0 mt-auto"
      >
        <div className="max-w-3xl mx-auto px-4">
          <ChatInput
            inputRef={inputRef}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            handleSend={handleSend}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
