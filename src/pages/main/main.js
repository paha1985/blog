import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostCard } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../bff/constants';
import { Pagination } from './components/pagination/pagination';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then((posts) => {
			setPosts(posts.res.posts);
			setLastPage(posts.res.maxPage);
		});
	}, [requestServer, page, lastPage]);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						imageUrl={imageUrl}
						publishedAt={publishedAt}
						commentsCount={commentsCount}
					/>
				))}
			</div>
			<Pagination page={page} setPage={setPage} lastPage={lastPage} />
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}
`;
