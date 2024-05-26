import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/remix";
import { Link } from "@remix-run/react";
import { css } from "styled-system/css";
import { Button } from "../button/button";

export function Header() {
  return (
    <header
      className={css({
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "container",
        height: "4rem",
        paddingX: "1.5rem",
        borderBottom: "1px solid #e2e8f0",
        background: "white",
      })}
    >
      <div>
        <Link
          to="/"
          className={css({
            fontWeight: "extrabold",
          })}
        >
          Codebases{" "}
          <span
            className={css({
              color: "sky.500",
            })}
          >
            Snippet
          </span>
        </Link>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
        })}
      >
        <SignedIn>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            })}
          >
            <Button asChild>
              <Link to="/new">Create Snippet</Link>
            </Button>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            })}
          >
            <SignInButton mode="modal">
              <Button variant="transparent">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </header>
  );
}
