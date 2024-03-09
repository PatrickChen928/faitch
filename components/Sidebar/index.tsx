import { getRecommended } from "@/lib/appwrite/recommended-service";
import Recommended from "./Recommended";
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