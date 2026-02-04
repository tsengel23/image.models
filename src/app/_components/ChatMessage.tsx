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

export const ChatMessage = () => {
  const [open, setOpen] = useState(false);
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
          <ScrollArea className="w-full flex-1 border"></ScrollArea>
          <div className="">
            <Separator className="mb-2" />
            <Field
              orientation="horizontal"
              className="w-full px-2 pb-2 flex items-center justify-center gap-2"
            >
              <Input type="text" placeholder="Type your message..." />
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
