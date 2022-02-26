import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    if (this.findByEmail(email)) {
      throw new Error(`Email ${email} already taken`);
    }

    Object.assign(user, { name, email });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return undefined;
    }

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return undefined;
    }

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const { email } = receivedUser;

    const userToChange = this.findByEmail(email);

    if (!userToChange) {
      throw new Error("User not found");
    }

    userToChange.admin = true;
    userToChange.updated_at = new Date();

    return userToChange;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
