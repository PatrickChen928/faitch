export default function Loading({ text }: { text?: string }) {
  return (
    <div className="flex-center w-full gap-2">
      <img src="/assets/icons/loading.svg" alt="" width={24} height={24} />
      {text}
    </div>
  )
}