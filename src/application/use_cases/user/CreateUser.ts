import { UserEntity, Role } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';
import { ICryptManager } from '../../security/ICryptManager';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (
  { firstname, lastname, email, password, gender },
  userRepository: IUserRepository,
  bcrypt: ICryptManager
) => {
  const USER_DEFAULT = Role.profile;

  const exist = await userRepository.getByEmail(email);

  if (exist) {
    throw new Error(ExceptionMessages[ExceptionCode.DUPLICATE_ENTRY]);
  }

  const hashedPassword = bcrypt.hash(password);
  const user = new UserEntity(null, firstname, lastname, email, hashedPassword, USER_DEFAULT, gender);

  return userRepository.create(user);
};
