import { Card, CardContent } from "@/components/ui/card";
import { Send, Download, History, Wallet } from "lucide-react";

export function ActionButton() {
  return (
    <div className="flex h-[20%] flex-row justify-center w-full">
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
            <Send />
            </CardContent>
        </Card>
        <h4 className="flex font-semibold text-xs">Transfer</h4>
        </div>
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
            <Download />
            </CardContent>
        </Card>
        <h4 className="flex font-semibold text-xs">Receive</h4>
        </div>
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
            <History />
            </CardContent>
        </Card>
        <h4 className="flex font-semibold text-xs">History</h4>
        </div>
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
            <Wallet />
            </CardContent>
        </Card>
        <h4 className="flex font-semibold text-xs">Wallet</h4>
        </div>
    </div>
  );
}