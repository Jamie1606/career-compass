import AddIconButton from "@/components/add-icon-button";
import AddModal from "@/components/add-modal";
import CustomInput from "@/components/custom-input";
import { showToast } from "@/util/toast";
import { Input, useDisclosure } from "@heroui/react";
import { useState } from "react";

interface OfficeTypeFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OfficeTypeForm({ setRefresh }: OfficeTypeFormProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
  };

  const submitForm = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      showToast("Message", "Office type name is required.", "error");
      return false;
    }

    if (trimmedName.length < 3) {
      showToast("Message", "Office type name must be at least 3 characters.", "error");
      return false;
    }

    if (trimmedName.length > 100) {
      showToast("Message", "Office type name must be less than 100 characters.", "error");
      return false;
    }

    try {
      setLoading(true);
      const res = await window.OfficeTypeAPI.create({ name: trimmedName });
      setLoading(false);

      if (res.success === true) {
        showToast("Message", "Office type created successfully", "success");
        return true;
      } else {
        showToast("Message", res.error, "error");
        return false;
      }
    } catch (error) {
      showToast("Message", "Unexpected error occurred.", "error");
      setLoading(false);
      return false;
    }
  };

  return (
    <>
      <AddIconButton onOpen={onOpen} />
      <AddModal onClose={onClose} submitForm={submitForm} loading={loading} isOpen={isOpen} onOpenChange={onOpenChange} title="Add New Office Type" setRefresh={setRefresh} resetForm={resetForm}>
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <label htmlFor="name" className="text-[15px] font-medium">
            Office Type Name
          </label>
          <CustomInput autoFocus disabled={loading} id="name" className="mt-2" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} isClearable onClear={() => setName("")} />
        </div>
      </AddModal>
    </>
  );
}
