import { IsString, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class CreateLocation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsLongitude()
  @IsNotEmpty()
  longitude: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  opinions: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  storeHours: string;
}
