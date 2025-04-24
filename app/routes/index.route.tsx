import { IndexPage } from "~/pages";

export function meta() {
  return [
    { title: "Beyram Taglietti" },
    {
      name: "description",
      content:
        "Beyram Taglietti - Software Engineer passionate about frontend development, UI/UX, and modern web technologies.",
    },
  ];
}

export default function Index() {
  return <IndexPage />;
}
