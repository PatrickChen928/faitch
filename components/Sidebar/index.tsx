import { getRecommended } from "@/lib/appwrite/recommended-service";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";

export default async function Sidebar() {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  )
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-sidebar border-r z-50">
      <RecommendedSkeleton />
    </aside>
  )
}