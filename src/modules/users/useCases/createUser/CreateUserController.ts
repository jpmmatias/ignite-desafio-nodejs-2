import { Response, Request } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	handle(request: Request, response: Response): Response {
		const { name, email } = request.body;
		if (this.createUserUseCase.emailAlreadyTaken(email)) {
			return response.status(400).json({ error: 'Email already taken' });
		}
		const user = this.createUserUseCase.execute({ name, email });

		return response.status(201).json({
			name: user.name,
			email: user.email,
			admin: user.admin,
		});
	}
}

export { CreateUserController };
