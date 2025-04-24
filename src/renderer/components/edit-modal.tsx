import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useEffect } from "react";

interface EditModalProps {
  title: string;
  isOpen: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onOpenChange: (isOpen: boolean) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
  submitForm: () => Promise<boolean>;
  checkDataExist: () => Promise<boolean>;
}

export default function EditModal({ isOpen, title, loading = false, children, onOpenChange, checkDataExist, resetForm, setRefresh, submitForm }: EditModalProps) {
  // check whether the data exists in database
  const handleCheckData = async () => {
    const result = await checkDataExist();
    if (!result) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
      handleCheckData();
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
                color="warning"
                onPress={async () => {
                  const success = await submitForm();
                  if (success) {
                    onClose();
                    setRefresh(true);
                  }
                }}
              >
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
