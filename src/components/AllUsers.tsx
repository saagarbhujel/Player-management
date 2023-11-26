import { useEffect, useState } from "react";
import { PageMeta, User } from "../types";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import Loader from "./Loader";
import Pagination from "./Pagination";

const AllUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setToast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page"));
  const [isLoadingUserCount, setIsLoadingUserCount] = useState(false);
  const [meta, setMeta] = useState({} as PageMeta);

  const fetchUsers = async () => {
    setIsLoadingUserCount(true);
    try {
      const res = await axiosPrivate.get(
        `/user?pageSize=10&page=${!page?.match(/^\d+$/) ? 1 : page}`
      );
      // console.log(res);
      if (res.statusText === "OK") {
        const users: User[] = res.data.data;
        const meta: PageMeta = res.data.meta;
        setUsers(users);
        setMeta(meta);
      }
    } catch (error) {
      setToast("Something went wrong. Please try again later.", "error");
    } finally {
      setIsLoadingUserCount(false);
    }
  };

  useEffect(() => {
    if (!page) return;
    setSearchParams({ page });
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  if (!users && isLoadingUserCount) {
    return (
      <div className="flex justify-center  items-center min-h-[calc(100vh-8rem)]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col mt-16 items-center">
      <h2 className="font-bold text-[28px]">All Users</h2>
      <div className=" w-[90vw] md:w-full overflow-auto mt-6">
        <table className="table-auto w-full text-left ">
          <colgroup className="rounded-lg">
            <col span={1} className="w-[35%]" />
            <col span={1} className="w-[50%]" />
            <colgroup span={1} className="w-[15%]" />
          </colgroup>
          <thead className="text-white bg-blue-400">
            <th scope="col" className="p-4 ">
              Name
            </th>
            <th scope="col" className="p-4">
              Email
            </th>
            <th scope="col" className="p-4">
              Role
            </th>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr className="bg-green-300/20 hover:bg-green-400/40 ">
                <td className="p-4 first-letter:capitalize">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 first-letter:capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta ? (
        <Pagination
          className="mt-6"
          meta={meta}
          onNext={() => setPage((meta.currentPage + 1).toString())}
          onPrev={() => setPage((meta.currentPage - 1).toString())}
          onFirstPage={() => setPage("1")}
          onLastPage={() => setPage(meta.totalPages.toString())}
        />
      ) : null}
    </div>
  );
};

export default AllUsers;
