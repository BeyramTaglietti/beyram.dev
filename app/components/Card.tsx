import type { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary rounded-xl p-3 min-h-[300px] flex">{children}</div>
  );
};

export default Card;
