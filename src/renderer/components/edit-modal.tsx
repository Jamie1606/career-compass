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
  onClose: () => void;
}

export default function EditModal({ isOpen, title, loading = false, children, onOpenChange, checkDataExist, resetForm, setRefresh, submitForm, onClose }: EditModalProps) {
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

  const handleSubmit = async () => {
    const success = await submitForm();
    if (success) {
      onClose();
      setRefresh(true);
    }
  };

  return (
    <Modal scrollBehavior="inside" size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        {() => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button isLoading={loading} disabled={loading} className="text-[15px]" color="warning" onPress={handleSubmit}>
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
