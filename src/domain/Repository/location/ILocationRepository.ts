import { IBaseRepository } from '../BaseRepository';
import { LocationEntity } from '../../entities/Location';

/**
 * UserRepository Interface
 * @interface
 */
export class ILocationRepository extends IBaseRepository<LocationEntity> {}
