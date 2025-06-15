import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, House, Link, Repeat, TreePalm, LayoutDashboard, Send, Download, History, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="relative flex flex-col w-screen h-screen">
      <div className="flex flex-1 w-full">
        <Card className="flex w-full rounded-b-4xl rounded-t-none" style={{
          background: 'linear-gradient(132deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 135, 1) 27%, rgba(143, 0, 209, 1) 72%)',
          boxShadow: '0 1px 20px rgba(61, 62, 213, 0.8)'
        }}>
          <CardContent className="flex flex-1 flex-col gap-2 p-2">
            <div className="flex h-[30%] flex-row gap-2 w-full">
              <div className="flex w-[25%] p-2">
                <Avatar className="w-18 h-18">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>RR</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex w-[65%] items-center">
                <h2 className="flex font-bold text-2xl">
                  Hi, Raymond
                </h2> 
              </div>
              <div className="flex w-[10%] p-2 justify-end">
                 <LayoutDashboard />
              </div>
            </div>

            <div className="flex h-[50%] flex-row px-2 gap-2 w-full">
              <div className="flex flex-1 flex-col gap-2 justify-center">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-1 items-center gap-1">
                    <h6 className="flex font-base text-xs">
                      0X725212......68876
                    </h6> 
                    <div className="flex flex-1 justify-start px-2">
                      <Copy size={12}/>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-1 items-center">
                    <h2 className="flex font-bold text-4xl">
                      $8,876.00
                    </h2> 
                  </div>
                  <div className="flex flex-1 justify-end">
                      <Badge variant="secondary" className="h-6">
                        -2%
                      </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-[20%] flex-row justify-center w-full">
              <div className="flex flex-col p-2 gap-2 items-center justify-center">
                <Card className="flex w-18 h-18 rounded-3xl">
                  <CardContent className="flex gap-1 items-center">
                    <Send />
                  </CardContent>
                </Card>
                <h4 className="flex font-semibold text-xs">Transfer</h4>
              </div>
              <div className="flex flex-col p-2 gap-2 items-center justify-center">
                <Card className="flex w-18 h-18 rounded-3xl">
                  <CardContent className="flex gap-1 items-center">
                    <Download />
                  </CardContent>
                </Card>
                <h4 className="flex font-semibold text-xs">Receive</h4>
              </div>
              <div className="flex flex-col p-2 gap-2 items-center justify-center">
                <Card className="flex w-18 h-18 rounded-3xl">
                  <CardContent className="flex gap-1 items-center">
                    <History />
                  </CardContent>
                </Card>
                <h4 className="flex font-semibold text-xs">History</h4>
              </div>
              <div className="flex flex-col p-2 gap-2 items-center justify-center">
                <Card className="flex w-18 h-18 rounded-3xl">
                  <CardContent className="flex gap-1 items-center">
                    <Wallet />
                  </CardContent>
                </Card>
                <h4 className="flex font-semibold text-xs">Wallet</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 px-4 w-full overflow-y-scroll no-scrollbar z-10">
        <Card className="flex w-full h-16 justify-center">
          <CardContent className="flex flex-row flex-1 gap-1 py-1 px-4">
            <div className="flex flex-row flex-1 items-center gap-2">
              <div className="flex justify-start items-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/token/eth.svg" />
                  <AvatarFallback>eth</AvatarFallback>
                </Avatar>
                <Avatar className="w-5 h-5 -ml-4 -mt-6">
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
      <Card className="absolute bottom-0 flex w-full h-2/14 rounded-t-4xl rounded-b-none z-20"
        style={{
          boxShadow: '0 -2px 30px -5px rgba(61, 62, 213, 0.8)'
        }}
      >
        <CardContent className="flex flex-1 flex-row gap-2 w-full">
          <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
              <House />
              <h4 className="flex font-semibold text-sm">Home</h4>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
              <Link />
              <h4 className="flex font-semibold text-sm">Bridge</h4>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
              <Repeat />
              <h4 className="flex font-semibold text-sm">Swap</h4>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 p-1 w-full">
              <TreePalm />
              <h4 className="flex font-semibold text-sm">Stake</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
