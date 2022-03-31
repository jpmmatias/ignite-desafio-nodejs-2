import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
	user_id: string;
}

class TurnUserAdminUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	execute({ user_id }: IRequest): User {
		const user = this.usersRepository.findById(user_id);
		return this.usersRepository.turnAdmin(user);
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
}

export { TurnUserAdminUseCase };
