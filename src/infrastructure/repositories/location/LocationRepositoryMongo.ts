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
    const mongooseLocations = await LocationSchema.find()
      .skip(pagination.offset)
      .limit(pagination.limit)
      .sort({ createdAt: 0 });

    const records = mongooseLocations.map(mongooseLocation => {
      return new LocationEntity(
        mongooseLocation.id,
        mongooseLocation.name,
        mongooseLocation.longitude,
        mongooseLocation.latitude,
        mongooseLocation.address,
        mongooseLocation.phone,
        mongooseLocation.mail,
        mongooseLocation.opinions,
        mongooseLocation.storeHours
      );
    });

    return { count, records };
  }

  async get(locationId: string | number): Promise<LocationEntity | boolean> {
    const mongooseLocation = await LocationSchema.findById(locationId);

    if (!mongooseLocation) {
      return false;
    }

    return new LocationEntity(
      mongooseLocation.id,
      mongooseLocation.name,
      mongooseLocation.longitude,
      mongooseLocation.latitude,
      mongooseLocation.address,
      mongooseLocation.phone,
      mongooseLocation.mail,
      mongooseLocation.opinions,
      mongooseLocation.storeHours,
    );
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

  async update(location: ILocation): Promise<boolean> {
    const { id, name, longitude, latitude, address, mail, opinions, phone, storeHours } = location;
    const mongooseLocation = await LocationSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          longitude,
          latitude,
          address,
          mail,
          opinions,
          phone,
          storeHours
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    return Boolean(mongooseLocation);
  }

  async remove(locationId: string | number): Promise<boolean> {
    const mongooseLocation = await LocationSchema.findByIdAndDelete(locationId);

    return Boolean(mongooseLocation);
  }
}
