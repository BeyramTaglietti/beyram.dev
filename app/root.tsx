import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Analytics } from "@vercel/analytics/react";
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
          <Sidebar />

          <div className="h-full w-full py-5 px-2 overflow-auto lg:px-14 flex-1">
            <Outlet />
          </div>
        </div>
        <Analytics />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
