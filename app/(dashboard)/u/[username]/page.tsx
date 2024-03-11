interface CreatorPageProps {
  params: {
    username: string
  },
  children: React.ReactNode
}

export default function CreatorPage({ params }: CreatorPageProps) {
  return (
    <div>
      <h1>Creator Page</h1>
    </div>
  )
}