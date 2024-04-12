import {
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/remix";
import { css } from "styled-system/css";

export function Header() {
  return (
    <header
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "container",
        height: "4rem",
        paddingX: "1.5rem",
        borderBottom: "1px solid #e2e8f0",
      })}
    >
      <div>
        <a
          href="/"
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
        </a>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
        })}
      >
        <UserButton />
        <SignedOut>
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              columnGap: "1rem",
            })}
          >
            <SignInButton mode="modal">
              <button
                className={css({
                  fontSize: "sm",
                  lineHeight: 1.25,
                  fontWeight: "semibold",
                  color: { base: "black", _hover: "gray.700" },
                  cursor: "pointer",
                })}
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                className={css({
                  paddingX: "0.75rem",
                  height: "2.125rem",
                  borderRadius: "md",
                  backgroundColor: { base: "black", _hover: "gray.800" },
                  color: "white",
                  fontSize: "sm",
                  lineHeight: 1,
                  fontWeight: "semibold",
                  cursor: "pointer",
                })}
              >
                Sign up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </header>
  );
}
