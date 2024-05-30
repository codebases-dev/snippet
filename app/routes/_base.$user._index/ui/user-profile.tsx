import { css, cx } from "styled-system/css";
import { User } from "../model/user";

export interface UserProfileProps {
  user: User;
  className?: string;
}

export function UserProfile({ user, className }: UserProfileProps) {
  return (
    <div
      className={cx(
        css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1,
          gap: "1rem",
        }),
        className
      )}
    >
      <img
        src={user.imageUrl}
        alt=""
        className={css({
          width: "6rem",
          height: "6rem",
          borderRadius: "full",
          border: "1px solid",
          borderColor: "gray.200",
          cursor: "pointer",
          overflow: "hidden",
        })}
      />
      <h1
        className={css({
          fontSize: "3xl",
          fontWeight: "bold",
        })}
      >
        {user.displayName}
      </h1>
    </div>
  );
}
