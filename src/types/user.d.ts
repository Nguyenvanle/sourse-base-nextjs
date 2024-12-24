export type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export type UserCreate = Omit<User, "id">;

export type UserUpdate = { name: string } & Partial<UserCreate>;

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type UserQuery = RequireAtLeastOne<UserCreate>;
