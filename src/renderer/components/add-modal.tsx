import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useEffect } from "react";

interface AddModalProps {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  loading?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
  submitForm: () => Promise<boolean>;
  onClose: () => void;
}

export default function AddModal({ isOpen, loading = false, title, resetForm, onOpenChange, setRefresh, submitForm, children, onClose }: AddModalProps) {
  useEffect(() => {
    if (isOpen) {
      resetForm();
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
              <Button isLoading={loading} disabled={loading} className="text-[15px] bg-[#1d4ed8]/90 text-white" onPress={handleSubmit}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
