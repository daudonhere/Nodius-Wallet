import { Card, CardContent } from "@/components/ui/card";
import { Repeat } from "lucide-react";

export function SwapToken() {
  return (
    <Card className="flex w-18 h-18 rounded-3xl">
        <CardContent className="flex gap-1 items-center">
          <Repeat />
        </CardContent>
    </Card>
  );
}