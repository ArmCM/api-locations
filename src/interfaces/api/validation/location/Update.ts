import { IsDefined, IsString, ValidateIf, IsEmail, IsNotEmpty, IsLongitude, IsLatitude } from 'class-validator';

import { ExceptionCode } from '../../../../domain/exceptions/ExceptionMessages';

export class UpdateLocation {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.name)
  name?: string;

  @IsDefined()
  @IsLongitude()
  @IsNotEmpty()
  longitude: string;

  @IsDefined()
  @IsLatitude()
  @IsNotEmpty()
  latitude: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.address)
  address?: string;

  @IsDefined()
  @ValidateIf(o => o.email)
  @IsEmail(undefined, {
    message: ExceptionCode[ExceptionCode.NOT_VALID_EMAIL]
  })
  email?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.opinions)
  opinions?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.phone)
  phone?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.storeHours)
  storeHours?: string;
}
