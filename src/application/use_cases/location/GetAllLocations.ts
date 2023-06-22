import { IPagination } from '../../../interfaces/api/Pagination';
import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';

export default async (payload: IPagination, locationRepository: ILocationRepository): Promise<any> => {
  return locationRepository.find([], payload);
};
