import { Prompt } from "@/types/chat";

// プロンプト一覧（アイコン情報は名前のみを保持）
export const PROMPTS: Omit<Prompt, "icon">[] & { iconName: string }[] = [
  {
    iconName: "calculator",
    text: "Generate the monthly income statement",
  },
  {
    iconName: "lineChart",
    text: "Provide a 12-month cash flow forecast",
  },
  {
    iconName: "fileText",
    text: "Book a journal entry",
  },
  {
    iconName: "barChart",
    text: "Create a real-time financial dashboard",
  },
];
