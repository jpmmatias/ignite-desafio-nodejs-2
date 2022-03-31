import { Request, Response } from 'express';

import { ListAllUsersUseCase } from './ListAllUsersUseCase';

class ListAllUsersController {
	constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

	handle(request: Request, response: Response): Response {
		const { user_id } = request.body;

		if (!user_id) {
			return response.status(400).json({ error: 'User dont exist' });
		}

		const users = this.listAllUsersUseCase.execute(user_id);

		return response.status(200).json(users);
	}
}

export { ListAllUsersController };
