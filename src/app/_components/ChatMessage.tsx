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
import { useState } from "react";
type ChatItem = { role: "user" | "assistant"; text: string };

export const ChatMessage = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(" ");
  const [items, setItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    const message = input.trim();
    if (!message || loading) return;

    setError(null);
    setLoading(true);

    // 1) UI дээр user message-ээ шууд нэмнэ
    setItems((prev) => [...prev, { role: "user", text: message }]);
    setInput(" ");

    try {
      // 2) API руу POST
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }
      // 3) Reply-ийг UI дээр нэмнэ

      setItems((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "" },
      ]);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
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
          <ScrollArea className="w-full flex-1 p-3 border border-red-500">
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
                  if (e.key === "Enter") send();
                }}
                disabled={loading}
              />

              <Button className="w-9 h-9 rounded-full ">
                <Send className="w-4 h-4" />
              </Button>
            </Field>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
