import { Card, CardContent } from "@/components/ui/card";
import { History, Upload, Download } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TransactionHistory() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
              <History />
            </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col w-full h-full">
          <div className="flex flex-row gap-2 px-4 py-8 w-full h-[15%]">
            <div className="flex w-[75%] h-full">
              <Input type="email" placeholder="Transactions" />
            </div>
            <div className="flex w-[25%] h-full">
              <Button variant="outline">
                Search
              </Button>
            </div>
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
                    <div className="flex flex-1 justify-start">
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
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex flex-1 justify-end text-red-500">
                    <Upload size={16}/>
                  </div>
                  <div className="flex flex-1 justify-end">
                    <h2 className="flex font-bold text-xs">
                      $2,33.00
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    <div className="flex flex-1 justify-start">
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
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex flex-1 justify-end text-green-400">
                    <Download size={16} />
                  </div>
                  <div className="flex flex-1 justify-end">
                    <h2 className="flex font-bold text-xs">
                      $2,33.00
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </DrawerContent>
    </Drawer>
  );
}