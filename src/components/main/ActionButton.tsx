import { SendToken } from "@/components/main/SendToken";
import { ReceiveToken } from "@/components/main/ReceiveToken";
import { TransactionHistory } from "@/components/main/TransactionHistory";
import { SwapToken } from "@/components/main/SwapToken";

export function ActionButton() {
  return (
    <div className="flex h-[20%] flex-row justify-center w-full">
        
        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <SendToken className="group-hover:text-fuchsia-500" />
            <h4 className="flex font-semibold text-xs">Transfer</h4>
        </div>

        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <ReceiveToken className="group-hover:text-fuchsia-500"/>
            <h4 className="flex font-semibold text-xs">Receive</h4>
        </div>

        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <SwapToken className="group-hover:text-fuchsia-500"/>
            <h4 className="flex font-semibold text-xs">Swap</h4>
        </div>

        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <TransactionHistory className="group-hover:text-fuchsia-500"/>
            <h4 className="flex font-semibold text-xs">History</h4>
        </div>
    </div>
  );
}