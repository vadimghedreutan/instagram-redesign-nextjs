import Stories from './Stories'
import Posts from './Posts'

function Feed() {
	return (
		<main className="max-w-6xl mx-auto mb-8">
			<section>
				<Stories />
			</section>
			<section>
				<Posts />
			</section>
		</main>
	)
}

export default Feed
