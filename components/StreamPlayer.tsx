import { IUser } from "@/types"

interface StreamPlayerProps {
  user: IUser;
  stream: any;
  isFollowing: boolean;
}

export default function StreamPlayer({
  user,
  stream,
  isFollowing
}: StreamPlayerProps) {

  return (
    <div>

    </div>
  )
}