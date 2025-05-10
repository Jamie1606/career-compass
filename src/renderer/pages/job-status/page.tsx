import { Chip, Input } from "@heroui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { getContrastTextColor } from "@/util/color";
import { showToast } from "@/util/toast";
import DataTable from "@/components/data-table";
import { columns, StatusData } from "./columns";
import CustomPagination from "@/components/custom-pagination";
import { Status } from "src/main/database";

const JobStatusForm = lazy(() => import("./job-status-form"));
const JobStatusEditForm = lazy(() => import("./job-status-edit-form"));
const DeleteModal = lazy(() => import("@/components/delete-modal"));

const JobStatusPage = () => {
  const [data, setData] = useState<StatusData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteStatus = async (statusID: number | bigint) => {
    const res = await window.StatusAPI.delete(statusID);

    if (res.success === true) {
      showToast("Message", "Job status deleted successfully", "success");
      return true;
    } else {
      showToast("Message", res.error, "error");
      return false;
    }
  };

  const formatData = (data: Status[]): StatusData[] => {
    return data.map((item, index) => {
      return {
        key: index,
        no: (page - 1) * limit + index + 1 + ".",
        name: item.name,
        badge: (
          <Chip size="sm" className="font-semibold capitalize px-2 py-1 select-none" style={{ backgroundColor: "#" + item.color, color: getContrastTextColor(item.color) }}>
            {item.name}
          </Chip>
        ),
        action: (
          <div className="flex items-center gap-x-2 justify-center">
            <Suspense fallback="">
              <JobStatusEditForm setRefresh={setRefresh} editID={item.statusId} />
              <DeleteModal
                title="Delete Job Status"
                hoverTitle="Delete Job Status"
                message={
                  <span>
                    Are you sure you want to delete this job status <span className="font-semibold">"{item.name}"</span>?
                  </span>
                }
                onSubmit={() => deleteStatus(item.statusId)}
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
    const res = await window.StatusAPI.getList(search.trim(), limit, offset);
    if (res.success === true) {
      setData(formatData(res.data));
    } else {
      showToast("Message", res.error, "error");
    }
  };

  const getCount = async () => {
    const res = await window.StatusAPI.getCount(search.trim());
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
    document.title = "Career Compass | Job Status";
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
      <h1 className="text-[25px] font-bold">Job Status</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job status" isClearable onClear={() => setSearch("")} />
          </div>

          {/* add new job status */}
          <Suspense fallback="">
            <JobStatusForm setRefresh={setRefresh} />
          </Suspense>
        </div>

        {/* job contents */}
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

export default JobStatusPage;
