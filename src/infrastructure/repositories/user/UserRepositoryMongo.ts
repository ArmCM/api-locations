import UserSchema from '../../../infrastructure/orm/mongoose/schema/user';

import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';
import { Collection, Pagination } from '../../../domain/Repository/interfaces/IRead';
import { UserEntity, IUser } from '../../../domain/entities/User';

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

  async update(user: IUser): Promise<boolean> {
    const { id, firstname, lastname, email, gender } = user;
    const mongooseUser = await UserSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          firstname,
          lastname,
          email,
          gender
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!mongooseUser) {
      return false;
    }

    return true;
  }

  async remove(userId: string | number): Promise<boolean> {
    const mongooseUser = await UserSchema.findByIdAndDelete(userId);
    console.log(mongooseUser);

    if (!mongooseUser) {
      return false;
    }

    return true;
  }

  async get(userId: string | number): Promise<UserEntity | boolean> {
    const mongooseUser = await UserSchema.findById(userId);

    if (!mongooseUser) {
      return false;
    }

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

  async find(filters = [], pagination: Pagination): Promise<Collection> {
    const count = await UserSchema.countDocuments();
    const mongooseUsers = await UserSchema.find()
      .skip(pagination.offset)
      .limit(pagination.limit)
      .sort({ createdAt: 0 });

    const records = mongooseUsers.map(mongooseUser => {
      return new UserEntity(
        mongooseUser.id,
        mongooseUser.firstname,
        mongooseUser.lastname,
        mongooseUser.email,
        mongooseUser.password,
        mongooseUser.role,
        mongooseUser.gender
      );
    });

    return { count, records };
  }

  async getByEmail(email: string): Promise<UserEntity | boolean> {
    const mongooseUser = await UserSchema.findOne({ email });

    if (!mongooseUser) {
      return false;
    }

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
