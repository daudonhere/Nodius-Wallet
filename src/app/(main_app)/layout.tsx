'use client';

import { BottomNavigation } from "@/components/main/BottomNavigation";
import { LoadingScreen } from "@/components/loading-screen";
import { useNavigationStore } from "@/stores/navigationStore";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMounted } = useNavigationStore();

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <main className="flex-1 overflow-y-hidden">
        {children}
      </main>
      
      <BottomNavigation />
      {isMounted && <LoadingScreen />}
    </div>
  );
}