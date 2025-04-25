import type { VisitorModel } from "../models";

type GetVisitorsResponse = {
  count: number;
  visitors: VisitorModel[];
};
const getVisitors = async (): Promise<
  [GetVisitorsResponse | null, Error | null]
> => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/visitors", {
    method: "GET",
  });
  if (!res.ok) {
    return [null, new Error("Failed to fetch visitors")];
  }
  const data = await res.json();

  return [data, null];
};

const addVisitor = async (name: string): Promise<Error | null> => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/visitors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visitor_name: name }),
  });
  if (!res.ok) {
    return new Error("Failed to add visitor");
  }

  return null;
};

export default {
  getVisitors,
  addVisitor,
};
