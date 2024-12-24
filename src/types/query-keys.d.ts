import { ENDPOINTS } from "~/constants";

export interface QueryKeyObj<T extends string> {
  all: readonly [T];
  lists: () => readonly [T, "list"];
  list: (filters: string) => readonly [T, "list", { filters: string }];
  details: (id: string) => readonly [T, "detail", string];
  infinite: (filters: string) => readonly [T, "infinite", { filters: string }];
}

export type Endpoints = keyof typeof ENDPOINTS;
