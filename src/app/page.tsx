import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { House, Link, Repeat, TreePalm, LayoutDashboard, Send, Download, History, Wallet } from "lucide-react"

export default function Home() {
  return (
    <main className="relative flex flex-col w-screen h-screen bg-background gap-6">
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
                <h2 className="flex font-bold text-xl">
                  Hi!, Raymond
                </h2> 
              </div>
              <div className="flex w-[10%] p-2 justify-end">
                 <LayoutDashboard />
              </div>
            </div>

            <div className="flex h-[50%] flex-row px-2 gap-2 w-full">
              <div className="flex flex-1 flex-col gap-2 justify-center">
                <h6 className="flex font-base text-xs">
                  0X725212......68876
                </h6> 
                <Badge variant="default">Badge</Badge>
                 <h2 className="flex font-bold text-4xl">
                  $8,876,300.00
                </h2> 
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

      <div className="flex flex-1 flex-col gap-3 px-2 w-full">
        <h1 className="flex ml-2 font-semibold text-xl">
          Portfolio
        </h1>
        <Card className="flex w-full h-14 justify-center">
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className="flex w-full h-14 justify-center">
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
        <Card className="flex w-full h-14 justify-center">
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-1 flex w-full h-2/14">
        <Card className="flex w-full rounded-t-4xl rounded-b-none"
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
    </main>
  );
}
