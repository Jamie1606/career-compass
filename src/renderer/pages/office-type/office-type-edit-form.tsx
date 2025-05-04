import CustomInput from "@/components/custom-input";
import EditIconButton from "@/components/edit-icon-button";
import EditModal from "@/components/edit-modal";
import EditIcon from "@/icons/edit-icon";
import { showToast } from "@/util/toast";
import { Button, Input, useDisclosure } from "@heroui/react";
import { useState } from "react";

interface OfficeTypeEditFormProps {
  editID: number | bigint;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OfficeTypeEditForm({ editID, setRefresh }: OfficeTypeEditFormProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
  };

  const checkDataExist = async () => {
    const result = await window.OfficeTypeAPI.getById(editID);
    if (result.success) {
      setName(result.data.name);
      return true;
    }
    showToast("Message", "Office type not found", "error");
    return false;
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
      const res = await window.OfficeTypeAPI.update(trimmedName, editID);
      setLoading(false);

      if (res.success === true) {
        showToast("Message", "Office type updated successfully", "success");
        return true;
      } else {
        showToast("Message", res.error, "error");
        return true;
      }
    } catch (error) {
      showToast("Message", "Unexpected error occurred.", "error");
      return false;
    }
  };

  return (
    <>
      <EditIconButton onOpen={onOpen} hoverTitle="Edit Office Type" />
      <EditModal onClose={onClose} checkDataExist={checkDataExist} submitForm={submitForm} loading={loading} isOpen={isOpen} onOpenChange={onOpenChange} title="Edit Office Type" setRefresh={setRefresh} resetForm={resetForm}>
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <label htmlFor="name" className="text-[15px] font-medium">
            Office Type Name
          </label>
          <CustomInput autoFocus disabled={loading} id="name" className="mt-2" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} isClearable onClear={() => setName("")} />
        </div>
      </EditModal>
    </>
  );
}
