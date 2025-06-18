import { Card, CardContent } from "@/components/ui/card";
import { Repeat } from "lucide-react";
import { cn } from "@/libs/utils";

export function SwapToken({ className }: { className?: string }) {
  return (
    <Card className="flex w-18 h-18 rounded-3xl">
        <CardContent className="flex gap-1 items-center">
          <Repeat className={cn("transition-colors", className)} />
        </CardContent>
    </Card>
  );
}