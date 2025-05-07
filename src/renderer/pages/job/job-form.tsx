import AddIconButton from "@/components/add-icon-button";
import AddModal from "@/components/add-modal";
import CustomInput from "@/components/custom-input";
import { showToast } from "@/util/toast";
import { Autocomplete, AutocompleteItem, DatePicker, Select, SelectItem, Tab, Tabs, Textarea, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Employer, OfficeType, Status } from "src/main/database/db-types";

interface JobFormProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function JobForm({ setRefresh }: JobFormProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [applicationDate, setApplicationDate] = useState(today(getLocalTimeZone()));
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const [employerData, setEmployerData] = useState<Employer[]>([]);
  const [statusData, setStatusData] = useState<Status[]>([]);
  const [officeTypeData, setOfficeTypeData] = useState<OfficeType[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<number | bigint>(0);
  const [selectedOfficeType, setSelectedOfficeType] = useState<number | bigint>(0);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const resetForm = () => {
    setTitle("");
    setEmployer("");
    setSelectedOfficeType(0);
    setSelectedStatus(0);
    setLocation("");
    setJobDescription("");
    setResumeFile(null);
    setCoverLetterFile(null);
  };

  const getEmployers = async () => {
    const res = await window.EmployerAPI.getAll();
    if (res.success === true) {
      setEmployerData(res.data);
    } else {
      showToast("Message", res.error, "error");
    }
  };

  const getStatuses = async () => {
    const res = await window.StatusAPI.getAll();
    if (res.success === true) {
      setStatusData(res.data);
      setSelectedStatus(res.data[0].status_id);
    } else {
      showToast("Message", res.error, "error");
    }
  };

  const getOfficeTypes = async () => {
    const res = await window.OfficeTypeAPI.getAll();
    if (res.success === true) {
      setOfficeTypeData(res.data);
      setSelectedOfficeType(res.data[0].office_type_id);
    } else {
      showToast("Message", res.error, "error");
    }
  };

  useEffect(() => {
    if (isOpen) {
      getEmployers();
      getStatuses();
      getOfficeTypes();
    }
  }, [isOpen]);

  const submitForm = async () => {
    const trimmedTitle = title.trim();
    const trimmedEmployer = employer.trim();
    const trimmedLocation = location.trim();
    const trimmedJobLink = jobLink.trim();

    // Validate job title
    if (!trimmedTitle) {
      showToast("Message", "Job title is required.", "error");
      return false;
    }

    if (trimmedTitle.length < 3) {
      showToast("Message", "Job title must be at least 3 characters.", "error");
      return false;
    }

    if (trimmedTitle.length > 150) {
      showToast("Message", "Job title must be less than 150 characters.", "error");
      return false;
    }

    // Validate job link if provided
    if (trimmedJobLink) {
      try {
        new URL(trimmedJobLink);
      } catch {
        showToast("Message", "Please enter a valid URL for the job posting.", "error");
        return false;
      }
    }

    // Validate resume file if provided
    if (resumeFile) {
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(resumeFile.type)) {
        showToast("Message", "Resume must be a PDF or Word document.", "error");
        return false;
      }
      if (resumeFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        showToast("Message", "Resume file size must be less than 5MB.", "error");
        return false;
      }
    }

    // Validate cover letter file if provided
    if (coverLetterFile) {
      const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!validTypes.includes(coverLetterFile.type)) {
        showToast("Message", "Cover letter must be a PDF or Word document.", "error");
        return false;
      }
      if (coverLetterFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        showToast("Message", "Cover letter file size must be less than 5MB.", "error");
        return false;
      }
    }

    if (note && note.length > 250) {
      showToast("Message", "Note must be less than 250 characters.", "error");
      return false;
    }

    try {
      setLoading(true);

      // Convert files to base64 if they exist
      const resumeBase64 = resumeFile ? await convertFileToBase64(resumeFile) : null;
      const coverLetterBase64 = coverLetterFile ? await convertFileToBase64(coverLetterFile) : null;

      const jobData = {
        title: trimmedTitle,
        employer_name: trimmedEmployer,
        application_date: applicationDate.toString(),
        status_id: selectedStatus,
        office_type_id: selectedOfficeType,
        location: trimmedLocation,
        job_description: jobDescription,
        link: trimmedJobLink,
        resume: resumeBase64,
        cover_letter: coverLetterBase64,
        note: note,
      };

      const res = await window.JobAPI.create(jobData);
      setLoading(false);

      if (res.success === true) {
        showToast("Message", "Job application created successfully", "success");
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
      <AddIconButton onOpen={onOpen} hoverTitle="Add New Job Application" />
      <AddModal onClose={onClose} submitForm={submitForm} loading={loading} isOpen={isOpen} onOpenChange={onOpenChange} title="Add New Job Application" setRefresh={setRefresh} resetForm={resetForm}>
        <div className="flex flex-col w-full text-black px-3 pb-2">
          <label htmlFor="title" className="text-[15px] font-semibold">
            Job Title
          </label>
          <CustomInput aria-label="Job Title" autoFocus disabled={loading} id="title" className="mt-2" maxLength={150} value={title} onChange={(e) => setTitle(e.target.value)} isClearable onClear={() => setTitle("")} placeholder="Software Engineer" />

          <label htmlFor="employer" className="text-[15px] font-semibold mt-5">
            Employer
          </label>
          <Autocomplete
            disabled={loading}
            aria-label="Employer"
            id="employer"
            className="mt-2"
            allowsCustomValue
            defaultItems={employerData}
            onInputChange={(value) => setEmployer(value)}
            onSelectionChange={(value) => {
              const employer = employerData.find((e) => e.employer_id === value);
              if (employer) {
                setEmployer(employer.name);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                onClose();
              }
            }}
            placeholder="Google"
          >
            {(employer) => <AutocompleteItem key={employer.employer_id}>{employer.name}</AutocompleteItem>}
          </Autocomplete>

          <label htmlFor="applicationDate" className="text-[15px] font-semibold mt-5">
            Application Date
          </label>
          <DatePicker isDisabled={loading} id="applicationDate" showMonthAndYearPickers selectorButtonPlacement="start" value={applicationDate} onChange={(value) => setApplicationDate(value)} className="mt-2" maxValue={today(getLocalTimeZone())} aria-label="Application Date" />

          <label htmlFor="applicationStatus" className="text-[15px] font-semibold mt-5">
            Application Status
          </label>
          <Select
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

          <label htmlFor="officeType" className="text-[15px] font-semibold mt-5">
            Office Type
          </label>
          <Select
            disabled={loading}
            items={officeTypeData}
            classNames={{ value: "capitalize" }}
            className="mt-2"
            selectedKeys={[selectedOfficeType + ""]}
            onChange={(e) => {
              if (e.target.value) setSelectedOfficeType(Number(e.target.value));
            }}
            id="officeType"
            aria-label="Office Type"
          >
            {(officeType) => (
              <SelectItem className="capitalize" key={officeType.office_type_id}>
                {officeType.name}
              </SelectItem>
            )}
          </Select>

          <label htmlFor="location" className="text-[15px] font-semibold mt-5">
            Location
          </label>
          <CustomInput aria-label="Location" disabled={loading} id="location" className="mt-2" maxLength={250} value={location} onChange={(e) => setLocation(e.target.value)} isClearable onClear={() => setLocation("")} placeholder="123 Main St, Anytown, USA" />

          <label htmlFor="jobDescription" className="text-[15px] font-semibold mt-5">
            Job Description
          </label>
          <Textarea aria-label="Job Description" disabled={loading} id="jobDescription" className="mt-2" value={jobDescription} onValueChange={(value) => setJobDescription(value)} minRows={3} maxRows={12} placeholder="job description..." />

          <label htmlFor="jobLink" className="text-[15px] font-semibold mt-5">
            Link to Job Posting
          </label>
          <CustomInput aria-label="Job Link" disabled={loading} id="jobLink" className="mt-2" maxLength={250} value={jobLink} onChange={(e) => setJobLink(e.target.value)} isClearable onClear={() => setJobLink("")} placeholder="https://www.google.com" />

          <label htmlFor="note" className="text-[15px] font-semibold mt-5">
            Note
          </label>
          <CustomInput aria-label="Note" disabled={loading} id="note" className="mt-2" maxLength={250} value={note} onChange={(e) => setNote(e.target.value)} isClearable onClear={() => setNote("")} placeholder="any additional information about the application" />

          <label htmlFor="resume" className="text-[15px] font-semibold mt-5">
            Resume
          </label>
          <Tabs className="mt-2">
            <Tab key="existing" title="Select Existing">
              <Select aria-label="Existing Resume">
                <SelectItem>Resume 1</SelectItem>
              </Select>
            </Tab>
            <Tab key="new" title="Upload New">
              <CustomInput
                type="file"
                aria-label="Resume"
                disabled={loading}
                id="resume"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setResumeFile(file);
                }}
                accept=".pdf,.doc,.docx"
              />
            </Tab>
          </Tabs>

          <label htmlFor="coverLetter" className="text-[15px] font-semibold mt-5">
            Cover Letter
          </label>
          <CustomInput
            type="file"
            aria-label="Cover Letter"
            disabled={loading}
            id="coverLetter"
            className="mt-2"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setCoverLetterFile(file);
            }}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </AddModal>
    </>
  );
}
