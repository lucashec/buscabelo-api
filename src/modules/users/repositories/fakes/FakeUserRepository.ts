import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '@modules/users/repositories/IUserRepository';

export default class UserRepository implements IUserRepository{
  private users: User [] = [];

  public constructor() {
    this.users.push({ email: "user@email.com", password: "$2a$08$X5FklRSyVy.lLY9tGX6YaupccCvcONhylDxvgkKKd4libeqfRZe5S", id: "1", name: "user", avatar: "" })
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(
        user => user.id == id 
    )
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const findUser = this.users.find(
        user => user.email == email
    )
    return findUser;
  }

  public async save(user: User): Promise<User>{
    const userIndex = this.users.findIndex(_user => _user.email === user.email);
    if (userIndex > -1) this.users[userIndex] = user;
    else this.users.push(user);

    return user
  }
}