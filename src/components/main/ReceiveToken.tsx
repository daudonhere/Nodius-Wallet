import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export function ReceiveToken() {
  return (
    <Card className="flex w-18 h-18 rounded-3xl">
        <CardContent className="flex gap-1 items-center">
        <Download />
        </CardContent>
    </Card>
  );
}