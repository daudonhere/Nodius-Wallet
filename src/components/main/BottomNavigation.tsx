'use client';

import { Card, CardContent } from "@/components/ui/card";
import { House, Contact, TreePalm, ChartCandlestick } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useEffect, useRef } from 'react';
import { cn } from "@/libs/utils";
import { useNavigationStore } from '@/stores/navigationStore';

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { showLoader, hideLoader } = useNavigationStore();
  const [isPending, startTransition] = useTransition();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (isPending) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isPending, showLoader, hideLoader]);

  const navItems = [
    { href: '/dashboard', icon: House, label: 'Home' },
    { href: '/contact', icon: Contact, label: 'Contact' },
    { href: '/stake', icon: TreePalm, label: 'Stake' },
    { href: '/market', icon: ChartCandlestick, label: 'Market' },
  ];

  const handleNavigation = (path: string) => {
    if (pathname === path) return;
    
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <Card className="absolute bottom-0 flex bg-tersiery w-full h-2/14 rounded-t-4xl rounded-b-none z-20"
      style={{ boxShadow: '0 -2px 30px -5px rgba(61, 62, 213, 0.8)' }}
    >
      <CardContent className="flex flex-1 flex-row gap-2 w-full justify-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="group flex flex-1 flex-col items-center justify-center gap-1 p-1 w-full cursor-pointer transition-transform duration-75 active:scale-95"
            >
              <item.icon className={cn("transition-colors", isActive ? "text-primary" : "group-hover:text-primary")}/>
              <h4 className={cn("flex font-semibold text-sm transition-colors", isActive ? "text-primary" : "group-hover:text-primary")}>
                {item.label}
              </h4>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}