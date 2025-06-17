import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/main/ActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, LayoutDashboard } from "lucide-react";

export function HeroSection() {
  return (
    <Card className="flex w-full rounded-b-4xl rounded-t-none" style={{
      background: 'linear-gradient(132deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 135, 1) 27%, rgba(143, 0, 209, 1) 72%)',
      boxShadow: '0 1px 20px rgba(61, 62, 213, 0.8)'
    }}>
      <CardContent className="flex flex-1 flex-col gap-2 p-4 md:p-6">
        <div className="flex h-[30%] flex-row gap-2 md:gap-4 w-full">
          <div className="flex w-[25%] items-center">
            <Avatar className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
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
            <LayoutDashboard className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" />
          </div>
        </div>
        
        <div className="flex h-[50%] flex-row gap-2 w-full">
          <div className="flex flex-1 flex-col gap-2 justify-center">
            <div className="flex flex-row gap-2">
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