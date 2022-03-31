import { Request, Response } from 'express';

import { ListAllUsersUseCase } from './ListAllUsersUseCase';

class ListAllUsersController {
	constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

	handle(request: Request, response: Response): Response {
		const { user_id } = request.headers;

		if (this.listAllUsersUseCase.inexistentUser(user_id)) {
			return response.status(400).json({ error: 'User dont exist' });
		}

		if (this.listAllUsersUseCase.nonAdminUser(user_id)) {
			return response.status(400).json({ error: 'User needs to be an Admin' });
		}

		const users = this.listAllUsersUseCase.execute({ user_id });

		return response.status(200).json(users);
	}
}

export { ListAllUsersController };
