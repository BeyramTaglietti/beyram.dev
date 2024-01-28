import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import Sidebar from "./components/Sidebar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Beyram Taglietti" },
    {
      name: "description",
      content:
        "I'm Beyram Taglietti, a Software Engineer from Italy specialized in Frontend Development",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-[100dvh] w-full flex-col-reverse md:flex-row">
          <div className="h-[80px] md:h-full w-full md:w-[250px] 2xl:w-[350px] fixed bottom-0 left-0 md:top-0">
            <Sidebar />
          </div>

          <div className="pb-[80px] md:pb-0 pl-0 md:pl-[250px] 2xl:pl-[350px] w-full h-full">
            <main className="h-full py-5 px-2 lg:px-14 flex-1 flex justify-center">
              <div className="max-w-[1000px]">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
