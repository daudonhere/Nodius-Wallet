import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Nodius Defi Contact",
};

export default function MarketplaceLayout({
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