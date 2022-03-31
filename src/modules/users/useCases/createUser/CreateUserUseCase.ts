import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
	name: string;
	email: string;
}

class CreateUserUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	execute({ email, name }: IRequest): User {
		if (this.emailAlreadyTaken(email)) {
			throw Error('Erro');
		}
		return this.usersRepository.create({ email, name });
	}

	emailAlreadyTaken(email: string): boolean {
		const user = this.usersRepository.findByEmail(email);
		if (user) {
			return true;
		}
		return false;
	}
}

export { CreateUserUseCase };
