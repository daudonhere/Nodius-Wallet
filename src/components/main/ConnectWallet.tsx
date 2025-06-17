import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export function ConnectWallet() {
  return (
    <Card className="flex w-18 h-18 rounded-3xl">
        <CardContent className="flex gap-1 items-center">
        <Wallet />
        </CardContent>
    </Card>
  );
}