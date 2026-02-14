import { Separator } from "../components/ui/separator";
// import ChatMessage from "./_components/ChatMessage";
import { ChatMessage } from "./_components/ChatMessage";
import { TabsModel } from "./_components/TabsModel";

export default function Home() {
  return (
    <main className="border border-red-500 flex flex-col items-center w-screen min-h-screen bg-white relative">
      <div className="py-4 pl-12 w-full bg-gray-600">
        <p className="text-black font-semibold text-base ai-glow ">AI tools</p>
      </div>
      <Separator className="mb-6" />
      <div className="flex flex-col items-center w-[580px] h-fit border p-5 rounded-lg shadow-2xl">
        <TabsModel />
      </div>

      <ChatMessage />
    </main>
  );
}
