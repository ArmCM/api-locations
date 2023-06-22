import { UserEntity } from '../../entities/User';

import { IBaseRepository } from '../BaseRepository';

/**
 * UserRepository Interface
 * @interface
 */
export class IUserRepository extends IBaseRepository<UserEntity> {
  getByEmail(email: string): Promise<UserEntity | boolean> {
    throw new Error('Method not implemented.');
  }
}
