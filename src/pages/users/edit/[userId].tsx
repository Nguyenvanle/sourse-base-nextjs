import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useUser } from "~/hooks";

import { Button, Input } from "~/components/ui";

export default function EditUser() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const router = useRouter();
  const id = router.query.userId as string;

  const { user, updateUser } = useUser(id);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [user, id]);

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
          updateUser.mutate({
            id: id,
            user: {
              name,
              avatar,
            },
          })
        }
        disabled={updateUser.isPending}
      >
        {updateUser.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
