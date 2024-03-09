import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ hiddenTitle }: { hiddenTitle?: boolean }) {
  return (
    <div className="flex items-center">
      <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
      <h1 className={cn(hiddenTitle && 'hidden lg:block', "ml-2 font-mono text-xl font-bold")}>Faitch</h1>
    </div>
  );
}