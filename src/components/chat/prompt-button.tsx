"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3Icon,
  FileTextIcon,
  LineChartIcon,
  CalculatorIcon,
} from "lucide-react";
import { Prompt } from "@/types/chat";

interface PromptButtonProps {
  prompt: Prompt;
  index: number;
  onClick: (text: string) => void;
}

/**
 * アイコン名に基づいてアイコンコンポーネントを返す
 */
const getIconByName = (iconName: string) => {
  switch (iconName) {
    case "calculator":
      return <CalculatorIcon strokeWidth={1.8} className="size-5" />;
    case "lineChart":
      return <LineChartIcon strokeWidth={1.8} className="size-5" />;
    case "fileText":
      return <FileTextIcon strokeWidth={1.8} className="size-5" />;
    case "barChart":
      return <BarChart3Icon strokeWidth={1.8} className="size-5" />;
    default:
      return <FileTextIcon strokeWidth={1.8} className="size-5" />;
  }
};

/**
 * プロンプトボタンコンポーネント
 * 定型メッセージのボタンを表示する
 */
const PromptButton = React.memo(
  ({ prompt, index, onClick }: PromptButtonProps) => {
    // クライアントサイドでアイコンをレンダリング
    const icon =
      prompt.icon || (prompt.iconName ? getIconByName(prompt.iconName) : null);

    return (
      <motion.button
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          type: "spring",
          bounce: 0.25,
        }}
        onClick={() => onClick(prompt.text)}
        className="flex items-center gap-3 p-4 text-left border rounded-xl hover:bg-muted transition-all text-sm"
      >
        {icon}
        <span>{prompt.text}</span>
      </motion.button>
    );
  }
);

export default PromptButton;
