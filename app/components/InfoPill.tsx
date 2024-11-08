import type { ReactNode } from "react";

export const InfoPill = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <div className="flex gap-2 items-center py-1 px-3 rounded-lg bg-secondary">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};
