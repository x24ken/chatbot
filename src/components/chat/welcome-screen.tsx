import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PromptButton from "./prompt-button";
import { PROMPTS } from "@/constants/prompts";

interface WelcomeScreenProps {
  onPromptClick: (text: string) => void;
}

/**
 * ウェルカム画面コンポーネント
 * チャット開始前の初期画面を表示する
 */
const WelcomeScreen = React.memo(({ onPromptClick }: WelcomeScreenProps) => {
  // クライアントサイドでのみレンダリングするための状態
  const [isMounted, setIsMounted] = useState(false);

  // マウント後に状態を更新
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col justify-end h-full space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold">Hi there 👋</h1>
        <h2 className="text-xl text-muted-foreground">
          What can I help you with?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
        {isMounted && (
          <AnimatePresence>
            {PROMPTS.map((prompt, index) => (
              <PromptButton
                key={index}
                prompt={prompt}
                index={index}
                onClick={onPromptClick}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

export default WelcomeScreen;
