import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <Card className="flex w-full rounded-b-4xl rounded-t-none" style={{
      background: 'linear-gradient(132deg, rgba(2, 0, 36, 1) 0%, rgba(7, 7, 135, 1) 27%, rgba(143, 0, 209, 1) 72%)',
      boxShadow: '0 1px 20px rgba(61, 62, 213, 0.8)'
    }}>
      <CardContent className="flex flex-1 justify-center p-1 md:p-2">
        <h3 className="flex font-bold text-xl text-white">MARKET</h3>
      </CardContent>
    </Card>
  );
}