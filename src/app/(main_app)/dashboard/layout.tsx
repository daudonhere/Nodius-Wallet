import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Nodius Defi Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}