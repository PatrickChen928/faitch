"use client";

import { useGetBlockedUsers } from "@/lib/react-query/block";
import { Payment, columns } from "./_components/Columns";
import { DataTable } from "./_components/DataTable";
import { format } from "date-fns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default function CommunityPage() {
  const { data, isLoading } = useGetBlockedUsers()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const formattedData = data?.map((block) => ({
    userId: block.blocker.$id,
    imageUrl: block.blocker.imageUrl,
    username: block.blocker.name,
    createdAt: format(new Date(block.$createdAt), "dd/MM/yyyy"),
  }))

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