import { Card, CardContent } from "@/components/ui/card";
import { House, Contact, TreePalm, ChartCandlestick } from "lucide-react";

export function BottomNavigation() {
  return (
    <Card className="absolute bottom-0 flex w-full h-2/14 rounded-t-4xl rounded-b-none z-20"
      style={{
        boxShadow: '0 -2px 30px -5px rgba(61, 62, 213, 0.8)'
      }}
    >
      <CardContent className="flex flex-1 flex-row gap-2 w-full">
        <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full text-fuchsia-500">
            <House />
            <h4 className="flex font-semibold text-sm">Home</h4>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
            <Contact />
            <h4 className="flex font-semibold text-sm">Contact</h4>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
            <TreePalm />
            <h4 className="flex font-semibold text-sm">Stake</h4>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
            <ChartCandlestick />
            <h4 className="flex font-semibold text-sm">Market</h4>
        </div>
      </CardContent>
    </Card>
  );
}