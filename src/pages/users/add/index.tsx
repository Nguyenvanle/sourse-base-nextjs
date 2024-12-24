import { useState } from "react";

import { useUser } from "~/hooks";

import { Button, Input } from "~/components/ui";

export default function AddUser() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const { createUser } = useUser();

  return (
    <div className={"container mx-auto flex flex-1 flex-col gap-4 p-4"}>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <Button
        variant={"secondary"}
        onClick={() =>
          createUser.mutate({
            name,
            avatar,
            createdAt: new Date().toISOString(),
          })
        }
        disabled={createUser.isPending}
      >
        {createUser.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
