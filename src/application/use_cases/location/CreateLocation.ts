import { LocationEntity } from '../../../domain/entities/Location';

import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (
  { name, longitude, latitude, address, mail, opinions, phone, storeHours },
  locationRepository: ILocationRepository
) => {
  //const exist = await locationRepository.getById('');

  // if (exist) {
  //   throw new Error(ExceptionMessages[ExceptionCode.DUPLICATE_ENTRY]);
  // }

  const location = new LocationEntity(null, name, longitude, latitude, address, mail, opinions, phone, storeHours);

  return locationRepository.create(location);
};
