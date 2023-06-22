import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';
import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (id: string | number, locationRepository: ILocationRepository): Promise<any> => {
  const location = await locationRepository.get(id);

  if (!location) {
    throw new Error(ExceptionMessages[ExceptionCode.ENTITY_NOT_FOUND]);
  }

  return location;
};
