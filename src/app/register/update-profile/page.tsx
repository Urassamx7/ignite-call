import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { UpdateProfileView } from '@/modules/update-profile/ui/views/update-profile'

export default async function Page() {
	const session = await getServerSession(authOptions)
	return <UpdateProfileView session={session} />
}
