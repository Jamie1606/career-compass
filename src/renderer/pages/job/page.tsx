import CustomPagination from "@/components/custom-pagination";
import DataTable from "@/components/data-table";
import { Chip, Input } from "@heroui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { columns, JobData } from "./columns";
import { showToast } from "@/util/toast";
import { JobList } from "src/main/database/db-types";
import { getContrastTextColor } from "@/util/color";

const JobStatusUpdateForm = lazy(() => import("./job-status-update-form"));
const DeleteModal = lazy(() => import("@/components/delete-modal"));
const JobForm = lazy(() => import("./job-form"));

const JobPage = () => {
  const [data, setData] = useState<JobData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteJob = async (jobID: number | bigint) => {
    const res = await window.JobAPI.delete(jobID);

    if (res.success === true) {
      showToast("Message", "Job application deleted successfully", "success");
      return true;
    } else {
      showToast("Message", res.error, "error");
      return false;
    }
  };

  const formatData = (data: JobList[]): JobData[] => {
    return data.map((item, index) => {
      return {
        key: index,
        no: (page - 1) * limit + index + 1 + ".",
        title: item.title,
        employer: item.employer_name,
        office_type: item.office_type_name,
        location: item.location ? item.location : "-",
        status: (
          <Chip size="sm" className="font-semibold capitalize px-2 py-1 select-none" style={{ backgroundColor: "#" + item.status_color, color: getContrastTextColor(item.status_color) }}>
            {item.status_name}
          </Chip>
        ),
        action: (
          <div className="flex items-center gap-x-2 justify-center">
            <Suspense fallback={<></>}>
              <JobStatusUpdateForm editID={item.job_id} setRefresh={setRefresh} />
              <DeleteModal
                title="Delete Job"
                hoverTitle="Delete Job"
                message={
                  <span>
                    Are you sure you want to delete this job application <span className="font-semibold">"{item.title}"</span>?
                  </span>
                }
                onSubmit={() => deleteJob(item.job_id)}
                setRefresh={setRefresh}
              />
            </Suspense>
          </div>
        ),
      };
    });
  };

  const getList = async () => {
    const offset = (page - 1) * 10;
    const res = await window.JobAPI.getList(search.trim(), limit, offset);
    if (res.success === true) {
      setData(formatData(res.data));
    } else {
      showToast("Message", res.error, "error");
    }
  };

  const getCount = async () => {
    const res = await window.JobAPI.getCount(search.trim());
    if (res.success === true) {
      if (page > Math.ceil(res.data / limit) && page !== 1) {
        setPage(Math.ceil(res.data / limit));
      }
      setTotal(res.data);
    } else {
      showToast("Message", res.error, "error");
    }
  };

  useEffect(() => {
    document.title = "Career Compass | Job Applications";
  }, []);

  useEffect(() => {
    if (!loading) {
      getList();
    }
  }, [page, limit]);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        Promise.all([getList(), getCount()]).finally(() => {
          setRefresh(false);
        });
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [search, refresh]);

  useEffect(() => {
    Promise.all([getList(), getCount()]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col w-full px-4 mt-2">
      <h1 className="text-[25px] font-bold">Job Applications</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job applications" isClearable onClear={() => setSearch("")} />
          </div>

          {/* add new job application */}
          <Suspense fallback={<></>}>
            <JobForm setRefresh={setRefresh} />
          </Suspense>
        </div>

        {/* job application contents */}
        <div className="mt-6">
          <DataTable columns={columns} rows={data} loading={loading} />
        </div>

        <div className="w-full lg:px-4 xl:px-8 flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center basis-1/2 gap-x-4">
            {total > 0 && (
              <label className="text-[15px] select-none">
                {(page - 1) * limit + 1} - {page * limit < total ? page * limit : total} of {total} rows
              </label>
            )}
          </div>
          {total > 0 && <CustomPagination page={page} total={total} limit={limit} onChange={(page) => setPage(page)} />}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
