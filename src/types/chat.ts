import React from "react";

// メッセージの型定義
export type Message = {
  role: "user" | "assistant";
  content: string;
};

// プロンプトの型定義
export type Prompt = {
  icon?: React.ReactNode;
  iconName?: string;
  text: string;
};

// Refオブジェクトの型定義
export type MessageEndRefProps = {
  messageEndRef: React.MutableRefObject<HTMLDivElement | null>;
};

export type InputRefProps = {
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
};
