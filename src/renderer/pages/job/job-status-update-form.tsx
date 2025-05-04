import CustomInput from "@/components/custom-input";
import EditModal from "@/components/edit-modal";
import StepIcon from "@/icons/step-icon";
import { getContrastTextColor } from "@/util/color";
import { showToast } from "@/util/toast";
import { Button, Chip, Select, SelectItem, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { JobDetail, Status } from "src/main/database/db-types";

interface JobStatusUpdateFormProps {
  editID: number | bigint;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobStatusUpdateForm = ({ editID, setRefresh }: JobStatusUpdateFormProps) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<JobDetail | undefined>(undefined);
  const [statusData, setStatusData] = useState<Status[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<number | bigint>(0);

  const checkDataExist = async () => {
    const job = await window.JobAPI.getById(editID);
    if (job.success) {
      setJob(job.data);
      const status = await window.StatusAPI.getAll();
      if (status.success) {
        setStatusData(status.data);
        setSelectedStatus(job.data.status_history[0].status_id || 0);
        return true;
      }
    }
    showToast("Message", "Job not found", "error");
    return false;
  };

  const submitForm = async () => {
    if (selectedStatus === 0) {
      showToast("Message", "Please select a job status", "error");
      return false;
    }

    if (selectedStatus === job?.status_history[0].status_id) {
      showToast("Message", "Please select a different job status", "error");
      return false;
    }

    try {
      setLoading(true);

      const res = await window.JobStatusHistoryAPI.create({ job_id: editID, status_id: selectedStatus, note });
      setLoading(false);

      if (res.success === true) {
        showToast("Message", "Job status updated successfully", "success");
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

  const resetForm = () => {
    setNote("");
    setSelectedStatus(0);
  };

  return (
    <>
      <Button title="Update Status" size="sm" color="secondary" isIconOnly onPress={onOpen}>
        <StepIcon width={16} height={16} fill="#ffffff" />
      </Button>
      <EditModal onClose={onClose} checkDataExist={checkDataExist} submitForm={submitForm} loading={loading} isOpen={isOpen} onOpenChange={onOpenChange} title="Edit Job Status" setRefresh={setRefresh} resetForm={resetForm} buttonText="Update">
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <div className="flex justify-between">
            <div className="flex flex-col mt-2 gap-2">
              <p>
                Role: <span className="font-semibold">{job?.title}</span>
              </p>
              <p>
                Employer: <span className="font-semibold">{job?.employer_name}</span>
              </p>
              <p>
                Office Type: <span className="font-semibold">{job?.office_type_name}</span>
              </p>
              <p>
                Location: <span className="font-semibold">{job?.location || "N/A"}</span>
              </p>
            </div>
            <div className="flex flex-col mt-2 gap-2">
              <Chip size="sm" className="font-semibold capitalize px-2 py-1 select-none" style={{ backgroundColor: "#" + job?.status_history[0].status_color, color: getContrastTextColor(job?.status_history[0].status_color) }}>
                {job?.status_history[0].status_name}
              </Chip>
            </div>
          </div>

          <label htmlFor="note" className="text-[15px] font-medium mt-7">
            Job Status
          </label>
          <Select
            autoFocus
            disabled={loading}
            items={statusData}
            classNames={{ value: "capitalize" }}
            className="mt-2"
            selectedKeys={[selectedStatus + ""]}
            onChange={(e) => {
              if (e.target.value) setSelectedStatus(Number(e.target.value));
            }}
            id="applicationStatus"
            aria-label="Application Status"
          >
            {(status) => (
              <SelectItem className="capitalize" key={status.status_id}>
                {status.name}
              </SelectItem>
            )}
          </Select>

          <label htmlFor="note" className="text-[15px] font-medium mt-5">
            Note
          </label>
          <CustomInput disabled={loading} id="note" className="mt-2" maxLength={100} value={note} onChange={(e) => setNote(e.target.value)} isClearable onClear={() => setNote("")} />
        </div>
      </EditModal>
    </>
  );
};

export default JobStatusUpdateForm;
