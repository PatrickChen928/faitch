import Image from "next/image"
export default function Loading({ text }: { text?: string | React.ReactNode }) {
  return (
    <div className="flex-center w-full gap-2">
      <Image src="/assets/icons/loading.svg" alt="" width={24} height={24} />
      {text}
    </div>
  )
}