import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient();
}

export const randomPizzaNameQueryKey = ["random-pizza-name"];

export function fetchRandomPizzaName(origin: string = "") {
  // NOTE: ignore error handling to keep the example small
  return fetch(origin + "/api/pizza")
    .then((res) => res.json())
    .then(({ name }) => name as string);
}
