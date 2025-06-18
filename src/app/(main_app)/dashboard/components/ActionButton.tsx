import { SendToken } from "@/app/(main_app)/dashboard/components/SendToken";
import { ReceiveToken } from "@/app/(main_app)/dashboard/components/ReceiveToken";
import { TransactionHistory } from "@/app/(main_app)/dashboard/components/TransactionHistory";
import { SwapToken } from "@/app/(main_app)/dashboard/components/SwapToken";

export function ActionButton() {
  return (
    <div className="flex h-[25%] flex-row justify-center w-full text-foreground">
        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <SendToken className="group-hover:text-secondary" />
            <h4 className="flex font-semibold text-sm">Send</h4>
        </div>
        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <ReceiveToken className="group-hover:text-secondary"/>
            <h4 className="flex font-semibold text-sm">Receive</h4>
        </div>
        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <SwapToken className="group-hover:text-secondary"/>
            <h4 className="flex font-semibold text-sm">Swap</h4>
        </div>
        <div className="group flex flex-col p-2 gap-2 items-center justify-center cursor-pointer transition-transform duration-75 active:scale-95">
            <TransactionHistory className="group-hover:text-secondary"/>
            <h4 className="flex font-semibold text-sm">History</h4>
        </div>
    </div>
  );
}