import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
	user_id: string | string[];
}

class ShowUserProfileUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	execute({ user_id }: IRequest): User {
		if (typeof user_id !== 'string') {
			throw new Error('User_id não é uma array');
		}
		if (this.inexistentUser(user_id)) {
			throw new Error('Erro');
		}
		return this.usersRepository.findById(user_id);
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

export { ShowUserProfileUseCase };
