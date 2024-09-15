import { logout, fetchRoles, authotize, register, removeUser } from './operations';
import { fetchUsers } from './operations/fetch-users';
import { updateUserRole } from './operations/update-user-role';

export const server = {
	logout,
	register,
	authotize,
	fetchRoles,
	fetchUsers,
	updateUserRole,
	removeUser,
};
