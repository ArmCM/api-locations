import { Router } from 'express';

import IRoute from '../IRoute';

import LocationController from '../../controllers/LocationController';
import validationMiddleware from '../../middleware/Validation';
import { CreateLocation } from '../../validation/location';

export default class LocationRouter implements IRoute {
  public path = '/api/v1/location';
  public router = Router();

  private readonly routeController: LocationController;

  constructor() {
    this.routeController = new LocationController();

    this.initializeRoutes();
  }

  /**
   * @swagger
   *
   * tags:
   *  name: Location
   *  description: API to manage stores locations.
   *
   * definitions:
   *  Location:
   *    properties:
   *      id:
   *        type: number
   *        default: 1
   *      name:
   *        type: string
   *        default: john does pizza
   *      longitude:
   *        type: string
   *        default: -99.15702
   *      latitude:
   *        type: string
   *        default: 19.425136
   *      address:
   *        type: string
   *        default: Avenida Chapultepec 157, Colonia Juárez, 06600 Ciudad de México, México
   *      mail:
   *        type: string
   *        default: john@example.com
   *      opinions:
   *        type: string
   *        default: nice place
   *      phone:
   *        type: string
   *        default: 5544334444
   *      storeHours:
   *        type: string
   *        default: 10 am - 11pm
   *  LocationCreate:
   *    properties:
   *      name:
   *        type: string
   *        default: john
   *      longitude:
   *        type: string
   *        default: -99.15702
   *      latitude:
   *        type: string
   *        default: 19.425136
   *      address:
   *        type: string
   *        default: Avenida Chapultepec 157, Colonia Juárez, 06600 Ciudad de México, México
   *      mail:
   *        type: string
   *        default: john@example.com
   *      opinions:
   *        type: string
   *        defualt: nice place
   *      phone:
   *        type: string
   *        default: 5544332233
   *      storeHours:
   *        type: string
   *        default: 10am - 11pm
   */
  private initializeRoutes() {
    /**
     * @swagger
     *
     * /api/v1/location:
     *  post:
     *    summary: Create a new location
     *    tags:
     *      - Location
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/definitions/LocationCreate"
     *    responses:
     *      201:
     *        description: The created location.
     *      400:
     *        description: Bad request.
     *      5XX:
     *        description: Unexpected error.
     */
    this.router.post(this.path, validationMiddleware(CreateLocation), this.routeController.createLocation);
  }
}
