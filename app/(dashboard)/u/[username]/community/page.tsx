"use client";

import { format } from "date-fns";
import { useGetBlockedUsers } from "@/lib/react-query/block";
import { getColumns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";
import Loading from "./loading";

export default function CommunityPage() {
  const { data, isLoading, refetch } = useGetBlockedUsers()

  const columns = getColumns(refetch)

  if (isLoading) {
    return <Loading />
  }

  const formattedData = data?.map((block) => ({
    id: block.$id,
    userId: block.blocker.$id,
    imageUrl: block.blocker.imageUrl,
    username: block.blocker.name,
    createdAt: format(new Date(block.$createdAt), "dd/MM/yyyy"),
  })) || []

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl text-bold">Community Settings</h1>
      </div>
      <div>
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
}
