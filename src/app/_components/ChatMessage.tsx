"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
type ChatItem = { role: "user" | "assistant"; text: string };

export const ChatMessage = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [items, setItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ Шинэ message ирэх бүрт scroll хийх
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items, loading]);

  const send = async () => {
    const message = input.trim();
    if (!message || loading) return;

    setError(null);
    setLoading(true);

    // 1) UI дээр user message-ээ шууд нэмнэ
    setItems((prev) => [...prev, { role: "user", text: message }]);
    setInput("");

    try {
      // 2) API руу POST
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: "Unknown error",
        }));

        throw new Error(
          errorData.error || `Request failed with status ${res.status}`,
        );
      }

      const data = await res.json();
      // 3) Reply-ийг UI дээр нэмнэ

      setItems((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "No response" },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      // ✅ Алдаа гарсан user message-ийг устгах (сонголттой)
      // setItems((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false); // ✅ Үргэлж loading-ийг унтраах
    }
  };
  return (
    <div className="absolute bottom-10 right-10 shadow-accent">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-10 h-10 rounded-full">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          sideOffset={-50}
          className="p-0 w-[380px] h-[472px] flex flex-col justify-between "
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center mx-1">
              <p className="text-[#09090B] font-medium text-base p-2 chat-glow">
                Chat assistant
              </p>
              <Button
                type="button"
                variant={"outline"}
                className="w-8 h-8"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Separator />
          </div>
          <ScrollArea className="w-full flex-1 p-3 border overflow-hidden">
            <div className="flex flex-col gap-2">
              {items.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "mr-auto bg-muted"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div className="mr-auto bg-muted rounded-lg px-3 py-2 text-sm">
                  Typing...
                </div>
              )}

              {error && <div className="text-destructive text-xs">{error}</div>}
              {/* ✅ Auto-scroll anchor */}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="">
            <Separator className="mb-2" />
            <Field
              orientation="horizontal"
              className="w-full px-2 pb-2 flex items-center justify-center gap-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // ✅ Form submit зогсооно
                    send();
                  }
                }}
                disabled={loading}
              />

              <Button
                className="w-9 h-9 rounded-full "
                onClick={send}
                disabled={loading || input.trim().length === 0}
                type="button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </Field>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// bagsh

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { MessageCircle, X, Send, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function ChatMessage() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!input.trim() || isLoading) return;

//     const userMessage = input.trim();
//     setInput("");
//     setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messages: [...messages, { role: "user", content: userMessage }],
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to get response");

//       const data = await response.json();
//       // if (!response.ok) {
//       //   const err = await response.json().catch(async () => ({
//       //     error: await response.text(),
//       //   }));
//       //   throw new Error(err?.error || "Request failed");
//       // }
//       // const data = await response.json();

//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: data.message },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition-transform hover:scale-105 hover:bg-zinc-700"
//         aria-label={isOpen ? "Close chat" : "Open chat"}
//       >
//         {isOpen ? (
//           <X className="h-6 w-6" />
//         ) : (
//           <MessageCircle className="h-6 w-6" />
//         )}
//       </button>

//       {isOpen && (
//         <div className="fixed bottom-24 right-6 z-50 flex h-125 w-95 flex-col overflow-hidden rounded-xl border bg-white shadow-2xl">
//           <div className="flex items-center justify-between border-b bg-zinc-800 px-4 py-3 text-white">
//             <div className="flex items-center gap-2">
//               <MessageCircle className="h-5 w-5" />
//               <span className="font-semibold">AI Assistant</span>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="rounded p-1 hover:bg-zinc-700"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.length === 0 && (
//               <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
//                 <p>
//                   👋 Hi! How can I help you today?
//                   <br />
//                   Ask me anything about food or ingredients!
//                 </p>
//               </div>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   message.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
//                     message.role === "user"
//                       ? "bg-zinc-800 text-white"
//                       : "bg-gray-100 text-gray-900"
//                   }`}
//                 >
//                   {message.content}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-900">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Thinking...
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="flex items-center gap-2 border-t p-4"
//           >
//             <Input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               disabled={isLoading}
//               className="flex-1"
//             />
//             <Button
//               type="submit"
//               size="icon"
//               disabled={!input.trim() || isLoading}
//               className="bg-zinc-800 hover:bg-zinc-700"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }
