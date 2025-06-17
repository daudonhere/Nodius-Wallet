import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function SendToken() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="flex w-18 h-18 rounded-3xl">
            <CardContent className="flex gap-1 items-center">
              <Send />
            </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="h-full">
          <div className="mx-auto h-full w-full max-w-sm">
          <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                  <span className="sr-only">Decrease</span>
              <div className="flex-1 text-center">
                  <div className="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                  </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
              <DrawerClose asChild>
              </DrawerClose>
          </DrawerFooter>
          </div>
      </DrawerContent>
    </Drawer>
  );
}