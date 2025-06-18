import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/app/(main_app)/dashboard/components/ActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, LayoutDashboard } from "lucide-react";

export function HeroSection() {
  return (
    <Card className="flex w-full rounded-b-4xl rounded-t-none" style={{
      background: 'linear-gradient(140deg,rgba(2, 0, 36, 1) 0%, rgba(0, 0, 191, 1) 26%, rgba(242, 0, 255, 1) 100%)',
      boxShadow: '0 1px 20px rgba(61, 62, 213, 0.8)'
    }}>
      <CardContent className="flex flex-1 flex-col py-2 px-4 md:py-4 md:px-6">
        <div className="flex h-[30%] flex-row gap-2 text-foreground md:gap-4 w-full">
          <div className="flex w-[25%] items-center">
            <Avatar className="w-16 h-16 md:w-16 md:h-16 lg:w-20 lg:h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-[65%] items-center">
            <h2 className="flex font-bold text-2xl md:text-3xl lg:text-4xl">
              Hi, Raymond
            </h2>
          </div>
          <div className="flex w-[10%] p-2 justify-end items-start">
            <LayoutDashboard className="w-8 h-8" />
          </div>
        </div>
        
        <div className="flex h-[50%] flex-row gap-1 mb-4 w-full">
          <div className="flex flex-1 flex-col gap-2 justify-center text-foreground">
            <div className="flex flex-row">
              <div className="flex flex-1 items-center gap-2">
                <h6 className="flex font-base text-xs sm:text-sm md:text-base">
                  0X725212......68876
                </h6>
                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-1 items-center">
                <h2 className="flex font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  $8,876.00
                </h2>
              </div>
              <div className="flex flex-1 justify-end">
                <Badge variant="secondary" className="h-6 px-2 text-xs md:h-7 md:px-3 md:text-sm">
                  -2%
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <ActionButton />
      </CardContent>
    </Card>
  );
}