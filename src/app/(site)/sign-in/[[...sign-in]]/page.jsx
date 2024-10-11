import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return <div className='flex items-center justify-center p-3 min-h-[70vh]'>
    <SignIn />
  </div>
}