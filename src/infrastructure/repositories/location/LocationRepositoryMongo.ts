import LocationSchema from '../../../infrastructure/orm/mongoose/schema/location';
import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';
import { Collection, Pagination } from '../../../domain/Repository/interfaces/IRead';
import { ILocation, LocationEntity } from '../../../domain/entities/Location';

export default class LocationRepositoryMongo extends ILocationRepository {
  constructor() {
    super();
  }

  async create(location: ILocation): Promise<LocationEntity> {
    const { name,
      longitude,
      latitude,
      address,
      mail,
      opinions,
      phone,
      storeHours
    } = location;

    const mongooseLocation = new LocationSchema({
      name,
      longitude,
      latitude,
      address,
      mail,
      opinions,
      phone,
      storeHours
    });

    await mongooseLocation.save();

    return new LocationEntity(
      mongooseLocation.id,
      mongooseLocation.name,
      mongooseLocation.longitude,
      mongooseLocation.latitude,
      mongooseLocation.address,
      mongooseLocation.mail,
      mongooseLocation.opinions,
      mongooseLocation.phone,
      mongooseLocation.storeHours
    );
  }
}
