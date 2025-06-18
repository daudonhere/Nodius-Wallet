import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TokenList() {
  return (
    <div className="flex flex-1 flex-col gap-3 p-4 px-4 w-full overflow-y-scroll no-scrollbar z-10">
      <Card className="flex w-full h-16 justify-center">
        <CardContent className="flex flex-row flex-1 gap-1 py-1 px-4">
          <div className="flex flex-row flex-1 items-center gap-2">
            <div className="flex justify-start items-center">
              <Avatar className="w-10 h-10 border-2 border-fuchsia-500">
                <AvatarImage src="/token/eth.svg" />
                <AvatarFallback>eth</AvatarFallback>
              </Avatar>
              <Avatar className="w-5 h-5 -ml-4 -mt-6 border-2 border-fuchsia-500">
                <AvatarImage src="/token/arb.svg" />
                <AvatarFallback>arb</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-1">
              <div className="flex flex-1 justify-start">
                <h2 className="flex font-bold text-sm">
                  ETH
                </h2>
              </div>
              <div className="flex flex-1 justify-start">
                <h6 className="flex font-semibold text-xs">
                  Ethereum
                </h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <div className="flex flex-1 justify-end">
              <h2 className="flex font-bold text-sm">
                $2,33.00
              </h2>
            </div>
            <div className="flex flex-1 justify-end">
              <Badge variant="primary" className="h-4 p-1">
                2%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-1 w-full min-h-[25%]"/>
    </div>
  );
}