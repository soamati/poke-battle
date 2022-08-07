import { ItemStoreQuery } from "@/generated";
import { useToast } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

type Product = Pick<ItemStoreQuery["itemStore"][number], "item" | "price">;

type Cart = {
  [id: Product["item"]["id"]]: {
    product: Product;
    count: number;
  };
};

type Context = {
  cart: Cart;
  add: (item: Product) => void;
  remove: (itemId: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<Context | null>(null);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = React.useState<Cart>({});

  const toast = useToast();

  const add = React.useCallback(
    (product: Product) => {
      const { item } = product;

      setCart((prev) => {
        const onCart = prev[item.id];
        if (onCart) {
          return {
            ...prev,
            [item.id]: {
              ...onCart,
              count: onCart.count + 1,
            },
          };
        }
        return {
          ...prev,
          [item.id]: {
            product,
            count: 1,
          },
        };
      });

      toast({
        title: "Listo!",
        status: "success",
        description: `${product.item.name} agregado al carrito`,
      });
    },
    [toast]
  );

  const remove = React.useCallback((itemId: number) => {
    setCart((prev) => {
      const onCart = prev[itemId];
      if (!onCart) return { ...prev };

      if (onCart.count > 1) {
        return {
          ...prev,
          [itemId]: {
            ...onCart,
            count: onCart.count - 1,
          },
        };
      }

      delete prev[itemId];

      return { ...prev };
    });
  }, []);

  const clear = React.useCallback(() => setCart({}), []);

  return (
    <CartContext.Provider value={{ cart, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCartContext = () => {
  const cart = React.useContext(CartContext);

  if (!cart) {
    throw new Error("Use hook inside a CartProvider");
  }

  return cart;
};
