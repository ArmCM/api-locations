import LocationSchema from '../../../infrastructure/orm/mongoose/schema/location';
import { ILocationRepository } from '../../../domain/Repository/location/ILocationRepository';
import { Collection, Pagination } from '../../../domain/Repository/interfaces/IRead';
import { ILocation, LocationEntity } from '../../../domain/entities/Location';

export default class LocationRepositoryMongo extends ILocationRepository {
  constructor() {
    super();
  }

  async find(filters = [], pagination: Pagination): Promise<Collection> {
    const count = await LocationSchema.countDocuments();
    const mongooseUsers = await LocationSchema.find()
      .skip(pagination.offset)
      .limit(pagination.limit)
      .sort({ createdAt: 0 });

    const records = mongooseUsers.map(mongooseUser => {
      return new LocationEntity(
        mongooseUser.id,
        mongooseUser.name,
        mongooseUser.longitude,
        mongooseUser.latitude,
        mongooseUser.address,
        mongooseUser.phone,
        mongooseUser.mail,
        mongooseUser.opinions,
        mongooseUser.storeHours
      );
    });

    return { count, records };
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
