import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';

import LocationSerializer from '../serializers/location/LocationSerializer';

import LocationRepositoryMongo from '../../../infrastructure/repositories/location/LocationRepositoryMongo';
import CreateLocation from '../../../application/use_cases/location/CreateLocation';

export default class LocationController {
  async createLocation(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req;

    try {
      const location = await CreateLocation(body, new LocationRepositoryMongo());
      const locationSerializer = LocationSerializer.getInstance();

      return res.status(httpStatus.CREATED).send(locationSerializer.singleSerialize(location));
    } catch (error) {
      next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    }
  }
}
