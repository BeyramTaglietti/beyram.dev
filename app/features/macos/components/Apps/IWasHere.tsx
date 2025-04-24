import { format } from "date-fns";
import { Check, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { cn } from "~/utils";
import visitorsApi from "../../api/visitors.api";
import type { VisitorModel } from "../../models";
import { addVisitorSchema } from "../../schemas";

type VisitorsData = {
  loading: boolean;
  error: boolean;
  visitors: Array<VisitorModel>;
  count: number;
};

type IWasHereTabs = "people" | "techtotry";
export const IWasHere = () => {
  const [currentTab, setCurrentTab] = useState<IWasHereTabs>("people");

  const [data, setData] = useState<VisitorsData>({
    loading: true,
    error: false,
    visitors: [],
    count: 0,
  });

  // I'm not adding Tanstack Query for just one query in the entire app, gotta go the old way 🤠
  useEffect(() => {
    visitorsApi.getVisitors().then(([data, error]) => {
      if (error) {
        setData({ loading: false, error: true, visitors: [], count: 0 });
        return;
      }
      if (!data) return;

      setData({
        loading: false,
        error: false,
        ...data,
      });
    });
  }, []);

  return (
    <>
      <div className="flex flex-row size-full">
        <div className="h-full w-1/4 pl-1 pr-3 py-3 border-r border-gray-500/20">
          <span className="text-xs text-white/70">2025</span>
          <hr className="pb-2 border-gray-500/20" />
          <ul className="truncate">
            <NotesTab
              activeTab={currentTab === "people"}
              label="People who visited my website"
              onClick={() => setCurrentTab("people")}
            />
            <NotesTab
              activeTab={currentTab === "techtotry"}
              label="Tech to try"
              onClick={() => setCurrentTab("techtotry")}
            />
          </ul>
        </div>
        <div className="h-full w-3/4 pl-4 overflow-hidden">
          {currentTab === "people" && (
            <VisitorsListTab
              {...{
                data,
                setData,
              }}
            />
          )}
          {currentTab === "techtotry" && (
            <div className="flex flex-col">
              <h2 className="text-3xl capitalize">Tech to try</h2>
              <p className="text-sm text-white/70 py-2 w-full">
                This is a list of things I want to try in the future
              </p>
              <ul className="list-disc pl-6">
                <li>Nuxt</li>
                <li>Turbopack w/ pnpm</li>
                <li className="line-through">Threejs</li>
                <li className="line-through">React Three Fiber</li>
                <li className="line-through">D3js</li>
                <li>Trpc</li>
                <li>Tanstack Start</li>
                <li>Tanstack Form</li>
                <li className="line-through">Sqlx</li>
                <li>Sqlc</li>
                <li>Redis</li>
                <li>Elixir + Phoenix</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const VisitorsListTab = ({
  data,
  setData,
}: {
  data: {
    loading: boolean;
    error: boolean;
    visitors: Array<VisitorModel>;
    count: number;
  };
  setData: Dispatch<SetStateAction<VisitorsData>>;
}) => {
  const [visitorName, setVisitorName] = useState<string>("");
  const [nameSubmitted, setNameSubmitted] = useState<boolean>(false);

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setData((prev) => ({
          ...prev,
          count: prev.count + 1,
          visitors: [
            {
              visitor_name: visitorName,
              visit_date: new Date().toISOString(),
            },
            ...prev.visitors,
          ],
        }));
        setVisitorName("");
        setNameSubmitted(true);

        visitorsApi.addVisitor(visitorName).then((res) => {
          if (res) {
            setData((prev) => ({
              ...prev,
              error: true,
            }));
            return;
          }
        });
      }
    },
    [visitorName, setData]
  );

  const validInput = useMemo(() => {
    const parseResult = addVisitorSchema.safeParse({
      visitor_name: visitorName,
    });
    return parseResult.success;
  }, [visitorName]);

  return (
    <div className="flex flex-col size-full">
      <h2 className="text-3xl capitalize">I was here</h2>
      <p className="text-sm text-white/70 py-2 w-full">
        This is a list of people who visited my website (currently {data.count}
        ),
        <br /> feel free to add your name but please don't put anything weird 😅
      </p>
      <div className="overflow-y-auto flex-1 pr-4">
        {!nameSubmitted && (
          <div className="flex flex-row items-center justify-between">
            <input
              type="text"
              placeholder="My name is..."
              className="w-full text-white placeholder:text-white/40 focus:outline-none"
              onChange={(e) => {
                setVisitorName(e.target.value);
              }}
              value={visitorName}
              onKeyUp={(e) => (validInput ? onKeyUp(e) : null)}
            />

            {visitorName.length > 0 &&
              (validInput ? (
                <Check className="text-green-500" size={15} />
              ) : (
                <X className="text-red-500" size={15} />
              ))}
          </div>
        )}
        {data.error && (
          <>
            <span className="text-sm text-red-300/70">
              Oh no! Something went wrong, please try again later
            </span>
          </>
        )}
        {data.loading && (
          <>
            <span className="text-sm text-white/70">Loading...</span>
          </>
        )}
        {!data.loading && (
          <>
            {data.visitors.map(({ visitor_name, visit_date }, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-center"
              >
                <span>{visitor_name}</span>
                <span className="text-xs text-white/40">
                  {format(new Date(visit_date), "dd/MM/yyyy")}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const NotesTab = ({
  activeTab,
  label,
  onClick,
}: {
  activeTab: boolean;
  label: string;
  onClick: () => void;
}) => {
  return (
    <li
      className={cn(
        "px-2 py-1 truncate rounded",
        activeTab && "bg-amber-400/40"
      )}
      onClick={onClick}
    >
      {label}
    </li>
  );
};
