import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import MarkdownRenderer from "../markdown-renderer";

interface ChatMessageProps {
  message: Message;
}

/**
 * チャットメッセージコンポーネント
 * ユーザーとアシスタントのメッセージを表示する
 */
const ChatMessage = React.memo(({ message }: ChatMessageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("flex", {
      "justify-end": message.role === "user",
      "justify-start": message.role === "assistant",
    })}
  >
    <div
      className={cn("max-w-[80%] rounded-xl px-4 py-2", {
        "bg-foreground text-background": message.role === "user",
        "bg-muted": message.role === "assistant",
      })}
    >
      {message.role === "assistant" ? (
        <MarkdownRenderer content={message.content} />
      ) : (
        <p className="whitespace-pre-wrap">{message.content}</p>
      )}
    </div>
  </motion.div>
));

export default ChatMessage;
