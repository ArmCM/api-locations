import { Router } from 'express';

import IRoute from '../IRoute';

import LocationController from '../../controllers/LocationController';
import validationMiddleware from '../../middleware/Validation';
import { CreateLocation } from '../../validation/location';
import AuthMiddleware from "../../middleware/Auth";
import grantAccessMiddleware from "../../middleware/GrandAccess";

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
     *  get:
     *    summary: Lists all locations
     *    security:
     *      - jwt: []
     *    tags:
     *      - Location
     *    produces:
     *      - application/json
     *    parameters:
     *      - in: query
     *        name: page
     *        description: Number of page
     *        type: integer
     *        minimum: 1
     *        default: 1
     *      - in: query
     *        name: limit
     *        description: Number of user to return
     *        type: integer
     *        minimum: 10
     *        maximum: 100
     *        enum:
     *          10
     *          20
     *          50
     *          100
     *        default: 10
     *      - in: query
     *        name: filter
     *        description: Options for filtering the results
     *        type: object
     *        style: deepObject
     *        explode: true
     *    responses:
     *      200:
     *        description: The list of users.
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/definitions/Location"
     *      400:
     *        description: Bad request.
     *      401:
     *        description: Authorization information is missing or invalid.
     *      50X:
     *        description: Unexpected error.
     */
    this.router.get(this.path, this.routeController.getAllLocations);

    /**
     * @swagger
     * /api/v1/location/{id}:
     *  get:
     *    summary: Get a location by id
     *    tags:
     *      - Location
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The location id.
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        description: The location information.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Location"
     *      401:
     *        description: Authorization information is missing or invalid.
     *      404:
     *        description: A user not found.
     *      50X:
     *        description: Unexpected error.
     */
    this.router.get(`${this.path}/:id`, this.routeController.getLocation);

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
