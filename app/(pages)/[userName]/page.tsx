import { isFollowingUser } from "@/lib/appwrite/follow-service";
import { getUserByName } from "@/lib/appwrite/user-service";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    userName: string
  }
}

export default async function UserPage({ params }: UserPageProps) {

  const user = await getUserByName(params.userName);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.$id);

  return (
    <div className="flex flex-col gap-y-4">
      {user.name}
      {user.email}
    </div>
  )
}