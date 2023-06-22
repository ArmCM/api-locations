import { LocationEntity } from '../../../domain/entities/Location';
import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';

import { ExceptionCode, ExceptionMessages } from '../../../domain/exceptions/ExceptionMessages';

export default async (
  id: string | number,
  { name, longitude, latitude, address, email, opinions, phone, storeHours },
  locationRepository: ILocationRepository
) => {
  const exist: any | LocationEntity = await locationRepository.get(id);

  if (!exist) {
    throw new Error(ExceptionMessages[ExceptionCode.ENTITY_NOT_FOUND]);
  }

  const location = new LocationEntity(
    id,
    name || exist.name,
    longitude || exist.longitude,
    latitude || exist.latitude,
    address || exist.address,
    email || exist.email,
    opinions || exist.opinions,
    phone || exist.phone,
    storeHours || exist.storeHours
  );

  const updated = await locationRepository.update(location);

  if (!updated) {
    throw new Error(ExceptionMessages[ExceptionCode.BAD_REQUEST]);
  }

  return updated;
};
