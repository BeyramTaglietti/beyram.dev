import { useRef } from "react";

export const SnakeGame = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={gameContainerRef}
      className="size-full"
    >
      <iframe
        width="100%"
        height="100%"
        src="snake_game/ebiten.html"
        title="Snake Game"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
};
