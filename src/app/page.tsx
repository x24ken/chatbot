import ChatBot from "@/components/chat-box";

export default function HomePage() {
  return (
    <main className="w-full h-dvh bg-background">
      <div className="max-w-4xl mx-auto h-full">
        <ChatBot />
      </div>
    </main>
  );
}
