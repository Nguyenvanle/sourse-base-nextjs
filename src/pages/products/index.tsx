import { useQuery } from "@tanstack/react-query";

import { productService } from "~/services";

export default function About() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProduct,
    staleTime: 1000 * 60,
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
