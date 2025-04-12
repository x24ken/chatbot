import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "@/types/chat";
import { chat } from "@/actions/chat";
import { readStreamableValue } from "ai/rsc";

/**
 * チャット機能を管理するカスタムフック
 *
 * @returns チャット状態と関連する関数
 */
export function useChatLogic() {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);

  // 画面を自動的に下にスクロール
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // 入力欄をクリア
  const clearInput = () => {
    setInput("");
    if (inputRef.current) {
      inputRef.current.textContent = "";
    }
  };

  // プロンプトボタンがクリックされたときのハンドラー
  const handlePromptClick = useCallback((text: string) => {
    setInput(text);
    if (inputRef.current) {
      inputRef.current.textContent = text;
    }
  }, []);

  // メッセージ送信処理
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    clearInput();
    setIsLoading(true);
    setConversation((prev) => [...prev, userMessage]);
    setHasStartedChat(true);

    try {
      const { newMessage } = await chat([...conversation, userMessage]);

      let textContent = "";

      const assistantMessage: Message = {
        role: "assistant",
        content: "",
      };

      setConversation((prev) => [...prev, assistantMessage]);

      // ストリーミングレスポンスを処理
      for await (const delta of readStreamableValue(newMessage)) {
        textContent += delta;
        setConversation((prev) => {
          const newConv = [...prev];
          newConv[newConv.length - 1] = {
            role: "assistant",
            content: textContent,
          };
          return newConv;
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error. Please try again",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, conversation]);

  return {
    input,
    setInput,
    conversation,
    isLoading,
    hasStartedChat,
    messageEndRef,
    inputRef,
    handlePromptClick,
    handleSend,
  };
}
