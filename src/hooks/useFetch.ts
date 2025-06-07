// src/hooks/useFetch.ts
import useSWR, { SWRConfiguration } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
});

export function useFetch<T = any>(
  url: string,
  options: SWRConfiguration = {}
) {
  const { data, error, isValidating } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    ...options,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    isValidating,
  };
}
