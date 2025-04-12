import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ClipboardIcon, CheckIcon } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute z-10 top-2 right-2 p-2 bg-background/80 hover:bg-background border border-border/30 rounded-md text-foreground/70 hover:text-foreground transition-colors"
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <ClipboardIcon className="h-4 w-4" />
        )}
      </button>
      <div className="absolute top-0 left-0 right-8 px-4 py-1 text-xs font-medium text-muted-foreground bg-muted/80 border-b border-r border-border/10 rounded-br-md">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: "0.375rem",
          padding: "2rem 1rem 1rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
