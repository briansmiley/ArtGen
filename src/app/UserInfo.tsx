"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function UserInfo() {
  const { user } = useUser();
  return (
    <div className="flex gap-1 m-1">
      <UserButton />
      {user?.username}
    </div>
  );
}
