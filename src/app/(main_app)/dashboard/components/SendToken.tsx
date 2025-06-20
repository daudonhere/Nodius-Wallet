import { Card, CardContent } from "@/components/ui/card";
import { Send, Star } from "lucide-react";
import { Drawer,  DrawerHeader, DrawerTitle, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/libs/utils";

export function SendToken({ className }: { className?: string }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="flex w-18 h-18 items-center justify-center rounded-3xl border-2 border-secondary group-hover:border-primary transition-colors duration-500">
            <CardContent>
              <Send className={cn("text-foreground transition-colors duration-500", className)} />
            </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-2 h-full mx-auto lg:max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Transfer Token</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-row justify-center px-4 w-full">
          <Input
            className="flex w-full"
            type="text" 
            placeholder="Contact or Address" 
          />
        </div>
        <div className="flex flex-row justify-center px-4 w-full">
            <Button
              className="flex w-full"
              variant="default"
            >
              Scan
            </Button>
        </div>
        <div className="flex flex-row justify-start mt-2 px-4 w-full">
          <h2 className="flex font-bold text-lg ml-1">
            Favorite Transaction
          </h2>
        </div>
        <div className="flex flex-col gap-3 py-1 px-4 w-full h-[75%] overflow-y-scroll no-scrollbar">
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
                  <div className="flex flex-1 justify-start text-secondary-foreground">
                    <h6 className="flex text-xs font-semibold">
                      0X87824783..234212
                    </h6>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center text-primary justify-end">
                <Star />
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}