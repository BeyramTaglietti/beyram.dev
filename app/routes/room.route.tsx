import { RoomProvider } from "~/features/room/context";
import { RoomPage } from "~/pages";

export function meta() {
  return [
    { title: "Beyram Taglietti's room" },
    {
      name: "description",
      content:
        "This room is a 3d environment where you can find some nice and hidden gems about me, take a look!",
    },
  ];
}

export default function Room() {
  return (
    <RoomProvider>
      <RoomPage />
    </RoomProvider>
  );
}
