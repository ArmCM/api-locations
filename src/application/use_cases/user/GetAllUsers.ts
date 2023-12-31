import { IPagination } from '../../../interfaces/api/Pagination';
import { IUserRepository } from '../../../domain/Repository/user/IUserRepository';

export default async (payload: IPagination, userRepository: IUserRepository): Promise<any> => {
  return userRepository.find([], payload);
};
