import { EntityBase } from '../../EntityBase';
import { ILocation } from './location';

export class LocationEntity extends EntityBase implements ILocation {
  id?: string | number;
  name: string;
  longitude: string;
  latitude: string;
  address: string;
  mail: string;
  opinions: string;
  phone: string;
  storeHours: string;

  constructor(
    id = null,
    name: string,
    longitude: string,
    latitude: string,
    address: string,
    mail: string,
    opinions: string,
    phone: string,
    storeHours: string
  ) {
    super();

    this.id = id;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.address = address;
    this.mail = mail;
    this.opinions = opinions;
    this.phone = phone;
    this.storeHours = storeHours;
  }
}
