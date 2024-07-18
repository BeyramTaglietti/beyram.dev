import { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import "./tailwind.css";

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <div className="h-[80px] md:h-full w-full md:w-[250px] 2xl:w-[350px] fixed bottom-0 left-0 md:top-0 z-10">
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
