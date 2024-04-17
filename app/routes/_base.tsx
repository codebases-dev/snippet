import { Outlet } from "@remix-run/react";
import { Container } from "~/components/container";
import { Header } from "~/components/header";

export default function BaseLayout() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
