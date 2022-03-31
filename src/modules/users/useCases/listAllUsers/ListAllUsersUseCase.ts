import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
	user_id: string | string[];
}

class ListAllUsersUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	execute({ user_id }: IRequest): User[] {
		if (typeof user_id !== 'string') {
			throw new Error('User_id não é uma array');
		}
		const user = this.usersRepository.findById(user_id);

		if (!user.admin) throw new Error('User is not admin');

		return this.usersRepository.list();
	}

	inexistentUser(user_id: string | string[]): boolean {
		if (typeof user_id !== 'string') {
			throw new Error('User_id não é uma array');
		}
		const user = this.usersRepository.findById(user_id);
		if (!user) {
			return true;
		}
		return false;
	}

	nonAdminUser(user_id: string | string[]): boolean {
		if (typeof user_id !== 'string') {
			throw new Error('User_id não é uma array');
		}
		const user = this.usersRepository.findById(user_id);
		if (!user.admin) {
			return true;
		}
		return false;
	}
}

export { ListAllUsersUseCase };
