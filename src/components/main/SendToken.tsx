import { Card, CardContent } from "@/components/ui/card";
import { Send, ScanLine, Star } from "lucide-react";
import { Drawer,  DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReceiveToken() {}

export function SendToken() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
              <Send />
            </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-2 w-full h-full">
        <DrawerHeader>
          <DrawerTitle>TRANSFER TOKEN</DrawerTitle>
          <DrawerDescription>Lorem ipsum dollor sit ammet</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-row gap-2 px-4 w-full">
          <div className="flex w-[75%] h-full">
            <Input
              className="flex w-full"
              type="email" 
              placeholder="Wallet Address" 
            />
          </div>
          <div className="flex w-[25%] h-full">
            <Button
              className="flex w-full"
              variant="outline"
            >
              Send <Send />
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 px-4 w-full">
            <Button
              className="flex w-1/4"
              variant="outline"
            >
              Scan <ScanLine />
            </Button>
        </div>
        <div className="flex flex-row justify-start px-4 w-full">
          <h2 className="flex font-bold text-lg ml-1">
            Favorite Transaction
          </h2>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 w-full h-[75%] overflow-y-scroll no-scrollbar">
          <Card className="flex w-full h-16 justify-center">
            <CardContent className="flex flex-row flex-1 gap-1 py-1 px-4">
              <div className="flex flex-row flex-1 items-center gap-2">
                <div className="flex justify-start items-center">
                  <Avatar className="w-11 h-11 border-2">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>RR</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-1 flex-col justify-start gap-1">
                  <div className="flex flex-1 justify-start text-fuchsia-500">
                    <h2 className="flex font-bold text-sm">
                      Goki Kato
                    </h2>
                  </div>
                  <div className="flex flex-1 justify-start">
                    <h6 className="flex font-semibold text-xs">
                      0X87824783..234212
                    </h6>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center text-fuchsia-500 justify-end">
                <Star />
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}