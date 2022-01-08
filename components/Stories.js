import { useEffect, useState } from 'react'
import faker from 'community-faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

function Stories() {
	const { data: session } = useSession()
	const [stories, setStories] = useState([])

	useEffect(() => {
		const data = [...Array(10)].map((_, i) => ({
			...faker.helpers.contextualCard(),
			id: i,
		}))

		console.log(data)

		setStories(data)
	}, [])

	return (
		<div
			className="flex space-x-2 md:space-x-8 mt-4 rounded-md 
    overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-100 p-6 justify-center"
		>
			{stories.map((profile) => (
				<Story
					key={profile.id}
					img={profile.avatar}
					username={profile.username}
				/>
			))}

			{session && (
				<Story
					img={session.user.image}
					username={session.user.username}
				/>
			)}
		</div>
	)
}

export default Stories
