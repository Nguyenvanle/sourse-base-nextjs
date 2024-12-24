import { useState } from "react";

import localFont from "next/font/local";
import Link from "next/link";

import { User } from "~/types";

import { useUser } from "~/hooks";

import { Button } from "~/components/ui";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { users, deleteUser } = useUser();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const handleDelete = (userId: string) => {
    setDeletingIds((prev) => [...prev, userId]);
    deleteUser.mutate(userId, {
      onSettled: () => {
        setDeletingIds((prev) => prev.filter((id) => id !== userId));
      },
    });
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} container mx-auto flex flex-1 flex-col gap-4 p-4`}
    >
      {users?.map((user: User) => (
        <div key={user.id} className="flex flex-row gap-4 rounded border p-4">
          <div className="flex flex-1 items-center">
            {user.id} {user.name}
          </div>
          <div className="flex gap-4">
            <Link href={`/users/edit/${user.id}`} passHref>
              <Button variant={"secondary"}>Edit</Button>
            </Link>
            <Button
              variant={"destructive"}
              onClick={() => handleDelete(user.id)}
              disabled={deletingIds.includes(user.id)}
            >
              {deletingIds.includes(user.id) ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
