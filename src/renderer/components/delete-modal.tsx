import DeleteIcon from "@/icons/delete-icon";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { useState } from "react";

interface DeleteModalProps {
  title: string;
  message: string | React.ReactNode;
  hoverTitle?: string;
  onSubmit: () => Promise<boolean>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteModal({ title, message, hoverTitle, onSubmit, setRefresh }: DeleteModalProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button size="sm" color="danger" isIconOnly onPress={onOpen} title={hoverTitle}>
        <DeleteIcon width={16} height={16} fill="#ffffff" />
      </Button>
      <Modal scrollBehavior="inside" size="xl" isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>{message}</ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={loading}
                  disabled={loading}
                  className="text-[15px]"
                  color="danger"
                  onPress={async () => {
                    setLoading(true);
                    const success = await onSubmit();
                    if (success) {
                      onClose();
                      setRefresh(true);
                    }
                    setLoading(false);
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
