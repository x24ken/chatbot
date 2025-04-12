import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowUpIcon } from "lucide-react";
import { InputRefProps } from "@/types/chat";

interface ChatInputProps extends InputRefProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSend: () => Promise<void>;
}

/**
 * チャット入力フォームコンポーネント
 * メッセージの入力と送信を担当
 */
const ChatInput = ({
  inputRef,
  input,
  setInput,
  isLoading,
  handleSend,
}: ChatInputProps) => (
  <motion.div
    animate={{ height: "auto" }}
    whileFocus={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
    className="relative border rounded-2xl lg:rounded-e-3xl p-2.5 flex items-end gap-2 bg-background"
  >
    <div
      contentEditable
      role="textbox"
      onCompositionEnd={(e) => {
        // 日本語入力確定時の処理
        setInput(e.currentTarget.textContent || "");
      }}
      onInput={(e) => {
        // 通常の入力処理
        const event = e.nativeEvent as any;
        if (!event.isComposing) {
          setInput(e.currentTarget.textContent || "");
        }
      }}
      onKeyDown={(e) => {
        const event = e.nativeEvent as any;
        if (e.key === "Enter" && !e.shiftKey && !event.isComposing) {
          e.preventDefault();
          if (input.trim()) {
            handleSend();
          }
        }
      }}
      data-placeholder="Message..."
      className="flex-1 min-h-[36px] max-h-[120px] overflow-y-auto px-3 py-2 focus:outline-none text-sm bg-background rounded-md empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap break-words"
      ref={inputRef}
    />

    <Button
      size="icon"
      className="rounded-full shrink-0 mb-0.5"
      onClick={handleSend}
      disabled={!input.trim() || isLoading}
    >
      <ArrowUpIcon strokeWidth={2.5} className="size-5" />
    </Button>
  </motion.div>
);

export default ChatInput;
