//import { getUsers } from './get-users';

// export const getUser = async (loginToFind) => {
// 	const users = await getUsers();
// 	return users.find(({ login }) => login === loginToFind);
// };

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3005/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser);
