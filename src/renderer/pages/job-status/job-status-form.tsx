import AddIconButton from "@/components/add-icon-button";
import AddModal from "@/components/add-modal";
import CustomInput from "@/components/custom-input";
import { showToast } from "@/util/toast";
import { useDisclosure } from "@heroui/react";
import { useState } from "react";

interface JobStatusFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobStatusForm({ setRefresh }: JobStatusFormProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setColor("#000000");
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
      const res = await window.StatusAPI.create({ name: trimmedName, color: selectedColor });
      setLoading(false);

      if (res.success === true) {
        showToast("Message", "Job status created successfully", "success");
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
      <AddIconButton onOpen={onOpen} hoverTitle="Add New Job Status" />
      <AddModal onClose={onClose} submitForm={submitForm} loading={loading} isOpen={isOpen} onOpenChange={onOpenChange} title="Add New Job Status" setRefresh={setRefresh} resetForm={resetForm}>
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <label htmlFor="name" className="text-[15px] font-medium">
            Status Name
          </label>
          <CustomInput autoFocus disabled={loading} id="name" className="mt-2" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} isClearable onClear={() => setName("")} />

          <label htmlFor="color" className="mt-5 text-[15px] font-medium">
            Status Color
          </label>
          <CustomInput disabled={loading} id="color" type="color" className="mt-2" value={color} onChange={(e) => setColor(e.target.value)} isClearable onClear={() => setColor("#000000")} />
        </div>
      </AddModal>
    </>
  );
}
