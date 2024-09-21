import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
	// Get the userId from auth() -- if null, the user is not signed in
	const { userId } = auth();

	if (userId) {
		// Query DB for user specific information or display assets only to signed in users
	}

	// Get the Backend API User object when you need access to the user's information
	const user = await currentUser();

  return (
    <div className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded'>
      <h1 className='text-4xl font-bold'>Welcome</h1>
      <ul className='list-none mt-10'>
        <li className='mb-2'>
          <span className='font-semibold'>First Name:</span> {user.firstName}
        </li>
        <li className='mb-2'>
          <span className='font-semibold'>Last Name:</span> {user.lastName}
        </li>
        <li className='mb-2'>
          <span className='font-semibold'>Email:</span>{' '}
          {user.emailAddresses[0].emailAddress}
        </li>
      </ul>
    </div>
  );
}