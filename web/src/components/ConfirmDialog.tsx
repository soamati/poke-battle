import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { Callback } from "@/types";

type Props = {
  isOpen: boolean;
  onConfirm: Callback;
  onClose: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
};

const ConfirmDialog = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const { isOpen, onConfirm, onClose, title, description } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title ? title : "¿Estás seguro?"}
          </AlertDialogHeader>

          {description && <AlertDialogBody>{description}</AlertDialogBody>}

          <AlertDialogFooter>
            <Button
              colorScheme="yellow"
              variant="ghost"
              ref={cancelRef}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button colorScheme="yellow" onClick={onConfirm} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
