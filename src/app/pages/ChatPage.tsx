import { ChatBox } from "../components/ChatBox";

export default function ChatPage({ messages, onSendMessage }: any) {
  return (
    <div className="h-full">
      <ChatBox messages={messages} onSendMessage={onSendMessage} />
    </div>
  );
}