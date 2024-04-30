import { Outlet } from "@remix-run/react";
import { css } from "styled-system/css";
import { Header } from "~/components/header";

export default function BaseLayout() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <Header />
      <main
        className={css({
          paddingTop: "4rem",
          background: "gray.50",
          minHeight: "100vh",
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}
