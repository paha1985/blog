export const getPostsCount = (searchPhrase) =>
	fetch(`http://localhost:3005/posts?title_like=${searchPhrase}`)
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedPosts) => loadedPosts && loadedPosts.length);
