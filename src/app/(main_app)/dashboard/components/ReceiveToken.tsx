import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { cn } from "@/libs/utils";

export function ReceiveToken({ className }: { className?: string }) {
  return (
    <Card className="flex w-18 h-18 items-center justify-center rounded-3xl border-2 border-primary group-hover:border-secondary transition-colors duration-500">
        <CardContent>
          <Download className={cn("text-foreground transition-colors duration-500", className)} />
        </CardContent>
    </Card>
  );
}