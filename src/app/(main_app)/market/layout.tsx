import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market",
  description: "Nodius Defi Market",
};

export default function MarketLayout({
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