import dayjs from "dayjs";
import { BiSolidCalendarEvent, BiSolidTimeFive } from "react-icons/bi";
import { PostModel } from "~/models/post.model";
import InfoPill from "./InfoPill";

export const PostHeader = ({ post }: { post: PostModel }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-primary rounded-xl p-4">
        <h1
          className="text-4xl w-full font-bold"
          style={{ viewTransitionName: "post-title" }}
        >
          {post.title}
        </h1>
        <div
          className="flex flex-row gap-2"
          style={{ viewTransitionName: "post-metrics" }}
        >
          <InfoPill
            icon={<BiSolidTimeFive />}
            text={`${post.readingTime} min read`}
          />
          <InfoPill
            icon={<BiSolidCalendarEvent />}
            text={dayjs(post.date).format("MMMM YYYY")}
          />
        </div>
      </div>
      <div className="mt-4 text-justify flex flex-col gap-6">
        <div className="flex justify-center">
          <img
            src={post.backgroundUrl}
            alt={post.title}
            className="w-full"
            style={{ viewTransitionName: "post-image" }}
          />
        </div>
      </div>
    </div>
  );
};
