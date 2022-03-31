import { Request, Response } from 'express';

import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

class ShowUserProfileController {
	constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

	handle(request: Request, response: Response): Response {
		const { user_id } = request.params;

		if (this.showUserProfileUseCase.inexistentUser(user_id)) {
			return response.status(404).json({ error: 'User dont exist' });
		}

		const user = this.showUserProfileUseCase.execute({ user_id });

		return response.status(200).json(user);
	}
}

export { ShowUserProfileController };
