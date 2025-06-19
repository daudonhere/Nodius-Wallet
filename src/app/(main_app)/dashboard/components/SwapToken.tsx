import { Card, CardContent } from "@/components/ui/card";
import { Repeat } from "lucide-react";
import { cn } from "@/libs/utils";

export function SwapToken({ className }: { className?: string }) {
  return (
    <Card className="flex w-18 h-18 items-center justify-center rounded-3xl border-2 border-secondary group-hover:border-primary transition-colors duration-500">
        <CardContent>
          <Repeat className={cn("text-foreground transition-colors duration-500", className)} />
        </CardContent>
    </Card>
  );
}