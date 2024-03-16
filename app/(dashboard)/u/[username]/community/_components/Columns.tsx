"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import UnblockButton from "./UnblockButton";

export type BlockedUser = {
  id: string
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
}

type GetColumnsResult = (refetch: () => void) => ColumnDef<BlockedUser>[]

export const getColumns: GetColumnsResult = (refetch: () => void) => [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar name={row.original.username} imageUrl={row.original.imageUrl} />
        <span>{row.original.username}</span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} onChange={refetch} />,
  },
]
