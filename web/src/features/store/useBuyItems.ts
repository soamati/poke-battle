import client from "@/client";
import useErrorParser from "@/hooks/useErrorParser";
import { useBuyItemMutation } from "@/generated";
import { useQueryClient } from "@tanstack/react-query";
import { useCartContext } from "./CartProvider";

export default function useBuyItems() {
  const queryClient = useQueryClient();
  const { clear } = useCartContext();
  const { parser } = useErrorParser([], { withToast: true });

  const { mutate, isLoading } = useBuyItemMutation(client, {
    onSuccess: () => {
      clear();
      queryClient.invalidateQueries(["Wallet"]);
      queryClient.invalidateQueries(["ItemStore"]);
    },
    onError: (error: any) => parser(error),
  });

  return [mutate, isLoading] as const;
}
