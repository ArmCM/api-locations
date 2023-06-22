import { IBaseSerializer } from '../IBaseSerializer';

/**
 * Location Serializer
 */
export default class LocationSerializer implements IBaseSerializer {
  private static instance: LocationSerializer;

  private constructor() {}

  public static getInstance(): LocationSerializer {
    if (!LocationSerializer.instance) {
      LocationSerializer.instance = new LocationSerializer();
    }

    return LocationSerializer.instance;
  }

  serialize(data: any) {
    if (!data) {
      throw new Error('Data cannot be undefined or null');
    }

    if (Array.isArray(data)) {
      return data.map(this.singleSerialize);
    }

    return this.singleSerialize(data);
  }

  singleSerialize(entity: any): any {
    return {
      id: entity.id,
      name: entity.name,
      longitude: entity.longitude,
      latitude: entity.latitude,
      address: entity.address,
      email: entity.email,
      opinions: entity.opinions,
      phone: entity.phone,
      storeHours: entity.storeHours
    };
  }
}
