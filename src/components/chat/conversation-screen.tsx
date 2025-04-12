import React from "react";
import { motion } from "framer-motion";
import ChatMessage from "./chat-message";
import { Message, MessageEndRefProps } from "@/types/chat";

interface ConversationScreenProps extends MessageEndRefProps {
  conversation: Message[];
  input: string;
}

/**
 * 会話画面コンポーネント
 * メッセージの履歴を表示する
 */
const ConversationScreen = ({
  conversation,
  input,
  messageEndRef,
}: ConversationScreenProps) => (
  <motion.div
    animate={{
      paddingBottom: input
        ? input.split("\n").length > 3
          ? "206px"
          : "110px"
        : "80px",
    }}
    transition={{ duration: 0.2 }}
    className="pt-8 space-y-4"
  >
    {conversation.map((message, index) => (
      <ChatMessage key={index} message={message} />
    ))}
    <div ref={messageEndRef} />
  </motion.div>
);

export default ConversationScreen;
