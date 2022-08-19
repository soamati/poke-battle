import React from "react";
import Wallet from "@/features/user/Wallet";
import {
  HStack,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useCartContext } from "./CartProvider";
import useColors from "@/hooks/useColors";
import useBuyItems from "./useBuyItems";
import Link from "next/link";
import { MdCatchingPokemon } from "react-icons/md";

const Cart = () => {
  const colors = useColors();

  const { cart, remove, clear } = useCartContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const products = React.useMemo(() => {
    return Object.values(cart);
  }, [cart]);

  const total = React.useMemo(() => {
    return products.reduce((total, { product, count }) => {
      return total + product.price * count;
    }, 0);
  }, [products]);

  const [buy, isBuying] = useBuyItems();

  const handleBuy = () => {
    const itemsWithCount = products.map(({ product, count }) => ({
      itemId: product.item.id,
      count,
    }));
    buy({ data: { itemsWithCount } }, { onSuccess: () => onClose() });
  };

  return (
    <>
      <HStack justify="space-between" py={2}>
        <Wallet />

        <HStack>
          <Link href="/store/pokemon" passHref>
            <Button
              leftIcon={<Icon as={MdCatchingPokemon} />}
              colorScheme="yellow"
              size="sm"
              variant="ghost"
            >
              Tienda Pokémon
            </Button>
          </Link>

          <Button
            leftIcon={<Icon as={FiShoppingCart} />}
            colorScheme="yellow"
            onClick={onOpen}
            size="sm"
          >
            Carrito {total !== 0 ? `(${total} PC)` : ""}
          </Button>
        </HStack>
      </HStack>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {products.length > 0 ? (
              <Stack>
                {products.map(({ product, count }) => (
                  <HStack
                    key={product.item.id}
                    justify="space-between"
                    borderColor={colors.fg}
                    borderWidth={1}
                    py="2"
                    px="4"
                    rounded="md"
                  >
                    <Stack>
                      <Text fontWeight="semibold">{product.item.name}</Text>
                      <Text>Unidades: {count}</Text>
                    </Stack>
                    <Stack align="end">
                      <Text pr="2">Precio: {product.price}</Text>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => remove(product.item.id)}
                      >
                        Quitar
                      </Button>
                    </Stack>
                  </HStack>
                ))}

                <HStack justify="space-between" py={2}>
                  <Text fontWeight="bold">Total: {total} PC</Text>

                  <Button size="sm" colorScheme="red" onClick={clear}>
                    Vaciar
                  </Button>
                </HStack>
              </Stack>
            ) : (
              <Center>
                <Text>No hay items</Text>
              </Center>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              mr={3}
              isDisabled={products.length < 1}
              isLoading={isBuying}
              onClick={handleBuy}
            >
              Comprar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Cart;
