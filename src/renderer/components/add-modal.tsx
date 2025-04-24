import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useEffect } from "react";

interface AddModalProps {
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
  loading?: boolean;
  submitForm: () => Promise<boolean>;
  children: React.ReactNode;
}

export default function AddModal({ isOpen, onOpenChange, title, resetForm, setRefresh, loading = false, submitForm, children }: AddModalProps) {
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Modal scrollBehavior="inside" size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button
                isLoading={loading}
                disabled={loading}
                className="text-[15px]"
                color="primary"
                onPress={async () => {
                  const success = await submitForm();
                  if (success) {
                    onClose();
                    setRefresh(true);
                  }
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
