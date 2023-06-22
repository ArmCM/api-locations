import UserSchema from '../../../infrastructure/orm/mongoose/schema/user';

import { UserEntity, IUser } from '../../../domain/entities/User/index';
import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';
import { Collection, Pagination } from '../../../domain/Repository/interfaces/IRead';

export default class UserRepositoryMongo extends IUserRepository {
  constructor() {
    super();
  }

  async create(user: IUser): Promise<UserEntity> {
    const { firstname, lastname, email, password, role, gender } = user;
    const mongooseUser = new UserSchema({ firstname, lastname, email, password, role, gender });

    await mongooseUser.save();

    return new UserEntity(
      mongooseUser.id,
      mongooseUser.firstname,
      mongooseUser.lastname,
      mongooseUser.email,
      mongooseUser.password,
      mongooseUser.role,
      mongooseUser.gender
    );
  }
}
