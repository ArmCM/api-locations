import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (id: string | number, locationRepository: ILocationRepository) => {
  const exist = await locationRepository.get(id);

  if (!exist) {
    throw new Error(ExceptionMessages[ExceptionCode.ENTITY_NOT_FOUND]);
  }

  return locationRepository.remove(id);
};
