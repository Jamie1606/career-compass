import { Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { OfficeType } from "src/main/database/db-types";
import { showToast } from "@/util/toast";
import { columns, OfficeTypeData } from "./columns";
import DataTable from "@/components/data-table";
import DeleteModal from "@/components/delete-modal";
import OfficeTypeForm from "./office-type-form";
import OfficeTypeEditForm from "./office-type-edit-form";
import CustomPagination from "@/components/custom-pagination";

const OfficeTypePage = () => {
  const [data, setData] = useState<OfficeTypeData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteOfficeType = async (officeTypeID: number) => {
    const res = await window.OfficeTypeAPI.delete(officeTypeID);

    if (res.success === true) {
      showToast("Message", "Office type deleted successfully", "success");
      return true;
    } else {
      showToast("Message", res.error, "error");
      return false;
    }
  };

  const formatData = (data: OfficeType[]): OfficeTypeData[] => {
    return data.map((item, index) => {
      return {
        key: index,
        no: (page - 1) * limit + index + 1 + ".",
        name: item.name,
        action: (
          <div className="flex items-center gap-x-2 justify-center">
            <OfficeTypeEditForm setRefresh={setRefresh} editID={item.office_type_id} />
            <DeleteModal title="Delete Office Type" message={`Are you sure you want to delete this office type "${item.name}"?`} onSubmit={() => deleteOfficeType(item.office_type_id)} setRefresh={setRefresh} />
          </div>
        ),
      };
    });
  };

  const getList = async () => {
    const offset = (page - 1) * 10;
    const res = await window.OfficeTypeAPI.getList(search.trim(), limit, offset);
    if (res.success === true) {
      setData(formatData(res.data));
    } else {
      showToast("Message", res.error, "error");
    }
  };

  const getCount = async () => {
    const res = await window.OfficeTypeAPI.getCount(search.trim());
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
    document.title = "Career Compass | Office Type";
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
      <h1 className="text-[25px] font-bold">Office Type</h1>
      <div className="flex flex-col w-full mt-4">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* search bar */}
            <Input className="max-w-80 lg:max-w-88 xl:max-w-96 mr-3" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search office type" isClearable onClear={() => setSearch("")} />
          </div>

          {/* add new office type */}
          <OfficeTypeForm setRefresh={setRefresh} />
        </div>

        {/* office type contents */}
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

export default OfficeTypePage;
