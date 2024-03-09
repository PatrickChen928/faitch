import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
      <h1 className="ml-2 font-mono text-xl font-bold">Faitch</h1>
    </div>
  );
}