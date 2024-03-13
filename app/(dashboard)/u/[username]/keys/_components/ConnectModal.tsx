"use client"

import { ElementRef, useRef, useState } from "react"
import { IngressInput } from "livekit-server-sdk"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue
} from "@/components/ui/select"
import { useCreateIngress } from "@/lib/react-query/stream"
import { toast } from "sonner"
import Loading from "@/components/Loading"

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export default function ConnectModal() {

  const closeRef = useRef<ElementRef<"button">>(null)

  const { mutateAsync, isPending } = useCreateIngress()
  const [ingressType, setIngressType] = useState<IngressType>(RTMP)


  const onSubmit = () => {
    mutateAsync(parseInt(ingressType) as IngressInput).then(() => {
      toast.success("Ingress created")
      closeRef.current?.click()
    }).catch(() => {
      toast.error("Failed to create ingress")
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Connect to your stream
          </DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value as IngressType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} variant="primary" onClick={onSubmit}>
            {isPending ? <Loading text="Generate" /> : "Generate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}