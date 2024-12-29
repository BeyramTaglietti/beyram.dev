import { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import { Sidebar } from "./components";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Beyram Taglietti" },
    {
      name: "description",
      content:
        "Software Engineer from Italy specialized in Frontend Development",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e48a3964-d5fd-4137-99d2-8daf8a61290e"
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex w-full flex-col-reverse md:flex-row">
      <div className="h-[80px] md:h-full w-full md:w-[250px] fixed bottom-0 left-0 md:top-0 z-10">
        <Sidebar />
      </div>

      <div className="mb-[80px] md:mb-0 pl-0 md:pl-[250px] 2xl:pl-[350px] w-full h-full">
        <main className="py-5 px-2 lg:px-14 flex justify-center min-h-[calc(100dvh-80px)] w-full">
          <div className="max-w-[1000px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
