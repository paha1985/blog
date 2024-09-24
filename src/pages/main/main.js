/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { PostCard, Search } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../bff/constants';
import { Pagination } from './components/pagination/pagination';
import { debounce } from './utils';
// import { getLastPageFromLinks } from './utils/get-last-page-from-links';
import { getPostsCount } from '../../bff/api/get-post-count';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				//				setLastPage(getLastPageFromLinks(links));
				setPosts(posts);
			},
		);
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
		setPage(1);
	};

	getPostsCount(searchPhrase).then((len) => {
		setLastPage(Math.ceil(len / PAGINATION_LIMIT));
	});

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
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
			) : (
				<div className="no-posts-found">Статьи не найдены</div>
			)}
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .no-posts-found {
		font-size: 18px;
		margin: 40px 0 40px 0;
		text-align: center;
	}
`;
