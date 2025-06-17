import { Card, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

export function TransactionHistory() {
  return (
    <Card className="flex w-18 h-18 rounded-3xl">
        <CardContent className="flex gap-1 items-center">
            <History />
        </CardContent>
    </Card>
  );
}