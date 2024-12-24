import Link from "next/link";

import { useAuthStore } from "~/stores";

import { cn } from "~/libs";

import { useLogin } from "~/hooks";

import { Button } from "~/components/ui";
import { ModeToggle } from "~/components/ui/mode-toggle";

function Navbar() {
  const { user } = useAuthStore();
  const login = useLogin();

  return (
    <nav className="flex flex-row justify-between p-4">
      <nav className="flex flex-row gap-4">
        <Link href="/" passHref>
          <Button>Home</Button>
        </Link>
        <Link href="/users/add" passHref>
          <Button>Add</Button>
        </Link>
      </nav>
      <nav className="flex flex-row justify-end gap-4">
        {user ? (
          <span className={cn("text-sm", "font-medium")}>{user.name}</span>
        ) : (
          <Button onClick={login}>Login</Button>
        )}
        <ModeToggle />
      </nav>
    </nav>
  );
}

export { Navbar };
