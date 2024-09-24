export const getCommentsCount = (comments = [], postId) => {
	comments.filter(({ postId: commentPostId }) => commentPostId === postId);
	return comments.length;
};
