import { useEffect, useState } from 'react'
// import faker from 'community-faker'
import { v4 as uuidv4 } from 'uuid'
import Story from './Story'
import { useSession } from 'next-auth/react'

const userProfile = [
	{
		imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
		username: 'Marianna Davidson',
	},
	{
		imgUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
		username: 'Kohen Welch',
	},
	{
		imgUrl: 'https://images.unsplash.com/photo-1546456073-92b9f0a8d413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
		username: 'Arbaaz Feeney',
	},
	{
		imgUrl: 'https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80',
		username: 'Klara Johnson',
	},
	{
		imgUrl: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
		username: 'Tyreke Hastings',
	},
	{
		imgUrl: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1357&q=80',
		username: 'Kody Flores',
	},
]

function Stories() {
	const { data: session } = useSession()
	const [stories] = useState(userProfile)

	console.log(stories)

	// useEffect(() => {
	// 	const data = [...Array(10)].map((_, i) => ({
	// 		...faker.helpers.contextualCard(),
	// 		id: i,
	// 	}))

	// 	console.log(data)

	// 	setStories(data)
	// }, [])

	return (
		<div
			className="flex space-x-2 md:space-x-8 mt-4 rounded-md 
    overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-100 p-6 justify-center"
		>
			{stories.map((profile) => (
				<Story
					key={uuidv4()}
					img={profile.imgUrl}
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
