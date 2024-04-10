import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";

export const useGetQuery = (query, key) => {

  const baseUrl = `https://api-eu-west-2.hygraph.com/v2/cluso8prw0qdg07wbpz4amcaa/master`;

  const { data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: async () => request(baseUrl, query),
  });

  return { data, isLoading, error };
};
