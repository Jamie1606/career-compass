import EditModal from "@/components/edit-modal";
import EditIcon from "@/icons/edit-icon";
import { showToast } from "@/util/toast";
import { Button, Input, useDisclosure } from "@heroui/react";
import { useState } from "react";

interface JobStatusEditFormProps {
  editID: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobStatusEditForm({ editID, setRefresh }: JobStatusEditFormProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setColor("#000000");
  };

  const checkDataExist = async () => {
    const result = await window.StatusAPI.getById(editID);
    if (result.success) {
      setName(result.data.name);
      setColor("#" + result.data.color);
      return true;
    }
    showToast("Message", "Status not found", "error");
    return false;
  };

  const submitForm = async () => {
    const trimmedName = name.trim();
    const selectedColor = color.split("#")[1] ?? "000000";

    if (!trimmedName) {
      showToast("Message", "Status name is required.", "error");
      return false;
    }

    if (trimmedName.length < 3) {
      showToast("Message", "Status name must be at least 3 characters.", "error");
      return false;
    }

    if (trimmedName.length > 100) {
      showToast("Message", "Status name must be less than 100 characters.", "error");
      return false;
    }

    try {
      setLoading(true);
      const res = await window.StatusAPI.update(trimmedName, selectedColor, editID);
      setLoading(false);

      if (res.success === true) {
        showToast("Message", "Job status updated successfully", "success");
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
      <Button size="sm" color="warning" isIconOnly onPress={onOpen}>
        <EditIcon width={16} height={16} fill="#ffffff" />
      </Button>
      <EditModal checkDataExist={checkDataExist} submitForm={submitForm} loading={loading} isOpen={isOpen} onOpenChange={onOpenChange} title="Add New Job Status" setRefresh={setRefresh} resetForm={resetForm}>
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <label htmlFor="name" className="text-[15px] font-medium">
            Status Name
          </label>
          <Input disabled={loading} id="name" className="mt-2" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} isClearable onClear={() => setName("")} />

          <label htmlFor="color" className="mt-5 text-[15px] font-medium">
            Status Color
          </label>
          <Input disabled={loading} id="color" type="color" className="mt-2" value={color} onChange={(e) => setColor(e.target.value)} isClearable onClear={() => setColor("#000000")} />
        </div>
      </EditModal>
    </>
  );
}
