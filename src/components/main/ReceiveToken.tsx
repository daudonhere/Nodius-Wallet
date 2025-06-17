import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { cn } from "@/libs/utils";

export function ReceiveToken({ className }: { className?: string }) {
  return (
    <Card className="flex w-18 h-18 rounded-3xl">
        <CardContent className="flex gap-1 items-center">
          <Download className={cn("transition-colors", className)} />
        </CardContent>
    </Card>
  );
}