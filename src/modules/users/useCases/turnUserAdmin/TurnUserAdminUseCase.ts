import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userToUpdate = this.usersRepository.findById(user_id);

    const userExists = this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("User not found");
    }

    const updatedUser = this.usersRepository.turnAdmin(userToUpdate);

    return updatedUser;
  }
}

export { TurnUserAdminUseCase };
