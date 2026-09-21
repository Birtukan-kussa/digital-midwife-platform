import { ShieldCheck } from "lucide-react";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf7f4]">
      <header className="flex items-center gap-2 px-8 py-6">
        <ShieldCheck className="h-5 w-5 text-emerald-800" />
        <span className="font-semibold text-emerald-950">MidwifeConnect</span>
      </header>

      <div className="flex items-center justify-center px-4 pb-16">{children}</div>
    </div>
  );
}