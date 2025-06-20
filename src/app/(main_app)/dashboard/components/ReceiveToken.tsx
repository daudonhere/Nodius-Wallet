import { Card, CardContent } from "@/components/ui/card";
import { Download, Copy, QrCode } from "lucide-react";
import { Drawer,  DrawerHeader, DrawerTitle, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/libs/utils";

export function ReceiveToken({ className }: { className?: string }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="flex w-18 h-18 items-center justify-center rounded-3xl border-2 border-secondary group-hover:border-primary transition-colors duration-500">
            <CardContent>
              <Download className={cn("text-foreground transition-colors duration-500", className)} />
            </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="flex flex-1 gap-2 p-2 h-full mx-auto lg:max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Receive Token</DrawerTitle>
        </DrawerHeader>
          <div className="flex flex-1 flex-col px-2 gap-4">
            <Card className="flex w-full h-32 justify-center"
              style={{
                boxShadow: '0 20px 20px -22px rgba(61, 62, 213, 0.8)'
              }}
            >
              <CardContent className="flex flex-col flex-1 gap-2 py-1 px-4">
                <div className="flex flex-1 flex-row justify-start">
                  <h3 className="text-md font-semibold text-foreground">
                    Your EVM address
                  </h3>
                </div>
                <div className="flex flex-1 flex-row gap-2 items-center">
                  <h6 className="text-xs font-semibold text-secondary-foreground">
                    0X8732723....897876
                  </h6>
                  <div className="flex flex-1 flex-row gap-2 justify-end">
                     <div className="group flex p-2 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                      <Copy size={16} className="group-hover:text-primary"/>
                    </div>
                    <div className="group flex p-2 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                      <QrCode size={16} className="group-hover:text-primary"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-row gap-2 items-center justify-start">
                  <Avatar className="w-5 h-5 border-2 border-primary">
                    <AvatarImage src="/blockchain/ethereum.svg" />
                    <AvatarFallback>eth</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-5 h-5 border-2 border-primary">
                    <AvatarImage src="/blockchain/avax.svg" />
                    <AvatarFallback>avax</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-5 h-5 border-2 border-primary">
                    <AvatarImage src="/blockchain/bnb.svg" />
                    <AvatarFallback>bnb</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-5 h-5 border-2 border-primary">
                    <AvatarImage src="/blockchain/polygon.svg" />
                    <AvatarFallback>polygon</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
            <Card className="flex w-full h-32 justify-center"
              style={{
                boxShadow: '0 20px 20px -22px rgba(61, 62, 213, 0.8)'
              }}
            >
              <CardContent className="flex flex-col flex-1 gap-2 py-1 px-4">
                <div className="flex flex-1 flex-row justify-start">
                  <h3 className="text-md font-semibold text-foreground">
                    Your Solana address
                  </h3>
                </div>
                <div className="flex flex-1 flex-row gap-2 items-center">
                  <h6 className="text-xs font-semibold text-secondary-foreground">
                    0X8732723....897876
                  </h6>
                  <div className="flex flex-1 flex-row gap-2 justify-end">
                     <div className="group flex p-2 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                      <Copy size={16} className="group-hover:text-primary"/>
                    </div>
                    <div className="group flex p-2 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                      <QrCode size={16} className="group-hover:text-primary"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-row gap-2 items-center justify-start">
                  <Avatar className="w-5 h-5 border-2 border-primary">
                    <AvatarImage src="/blockchain/solana.svg" />
                    <AvatarFallback>solana</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
            <Card className="flex w-full h-32 justify-center"
              style={{
                boxShadow: '0 20px 20px -22px rgba(61, 62, 213, 0.8)'
              }}
            >
              <CardContent className="flex flex-col flex-1 gap-2 py-1 px-4">
                <div className="flex flex-1 flex-row justify-start">
                  <h3 className="text-md font-semibold text-foreground">
                    Your TON address
                  </h3>
                </div>
                <div className="flex flex-1 flex-row gap-2 items-center">
                  <h6 className="text-xs font-semibold text-secondary-foreground">
                    0X8732723....897876
                  </h6>
                  <div className="flex flex-1 flex-row gap-2 justify-end">
                     <div className="group flex p-2 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                      <Copy size={16} className="group-hover:text-primary"/>
                    </div>
                    <div className="group flex p-2 bg-primary rounded-full border-2 border-mutted cursor-pointer hover:bg-mutted hover:border-2 hover:border-primary transition-color duration-500 active:scale-95">
                      <QrCode size={16} className="group-hover:text-primary"/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-row gap-2 items-center justify-start">
                  <Avatar className="w-5 h-5 border-2 border-primary">
                    <AvatarImage src="/blockchain/ton.svg" />
                    <AvatarFallback>ton</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          </div>
      </DrawerContent>
    </Drawer>
  );
}