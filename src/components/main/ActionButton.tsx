import { SendToken } from "@/components/main/SendToken";
import { ReceiveToken } from "@/components/main/ReceiveToken";
import { TransactionHistory } from "@/components/main/TransactionHistory";
import { SwapToken } from "@/components/main/SwapToken";

export function ActionButton() {
  return (
    <div className="flex h-[20%] flex-row justify-center w-full">
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
            <SendToken />
            <h4 className="flex font-semibold text-xs">Transfer</h4>
        </div>
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
            <ReceiveToken/>
            <h4 className="flex font-semibold text-xs">Receive</h4>
        </div>
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
            <SwapToken/>
            <h4 className="flex font-semibold text-xs">Swap</h4>
        </div>
        <div className="flex flex-col p-2 gap-2 items-center justify-center">
            <TransactionHistory/>
            <h4 className="flex font-semibold text-xs">History</h4>
        </div>
    </div>
  );
}