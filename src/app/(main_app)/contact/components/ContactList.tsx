import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Download, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ContactList() {
  return (
    <div className="flex flex-col gap-2 mt-2 w-full h-full">
      <div className="flex flex-row justify-center px-4 w-full">
        <Input
          className="flex w-full"
          type="text" 
          placeholder="Contact or Address" 
        />
      </div>
      <div className="flex flex-col gap-3 py-2 px-4 w-full h-[75%] overflow-y-scroll no-scrollbar">
        <Card className="flex w-full h-16 justify-center"
          style={{
            boxShadow: '0 20px 20px -22px rgba(61, 62, 213, 0.8)'
          }}
        >
          <CardContent className="flex flex-row flex-1 gap-1 py-1 px-4">
            <div className="flex flex-row flex-1 items-center gap-2">
              <div className="flex justify-start items-center">
                <Avatar className="w-11 h-11 border-2 border-primary">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RR</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-1 flex-col justify-start gap-1">
                <div className="flex flex-1 justify-start text-foreground">
                  <h2 className="flex font-bold text-sm">
                    Goki Kato
                  </h2>
                </div>
                <div className="flex flex-1 justify-start">
                  <h6 className="flex font-semibold text-xs text-secondary-foreground">
                    0X87824783..234212
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-row gap-2 items-center text-foreground justify-end">
              <div className="group flex p-3 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                <Download size={18} className="group-hover:text-primary"/>
              </div>
              <div className="group flex p-3 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                <Send size={18} className="group-hover:text-primary"/>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex w-full h-16 justify-center"
          style={{
            boxShadow: '0 20px 20px -22px rgba(61, 62, 213, 0.8)'
          }}
        >
          <CardContent className="flex flex-row flex-1 gap-1 py-1 px-4">
            <div className="flex flex-row flex-1 items-center gap-2">
              <div className="flex justify-start items-center">
                <Avatar className="w-11 h-11 border-2 border-primary">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RR</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-1 flex-col justify-start gap-1">
                <div className="flex flex-1 justify-start text-foreground">
                  <h2 className="flex font-bold text-sm">
                    Tomoki Adachi
                  </h2>
                </div>
                <div className="flex flex-1 justify-start">
                  <h6 className="flex font-semibold text-xs text-secondary-foreground">
                    0X87824783..234212
                  </h6>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-row gap-2 items-center text-foreground justify-end">
              <div className="group flex p-3 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                <Download size={18} className="group-hover:text-primary"/>
              </div>
              <div className="group flex p-3 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                <Send size={18} className="group-hover:text-primary"/>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}