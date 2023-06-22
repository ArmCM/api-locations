import { Router } from 'express';

import IRoute from '../IRoute';

import UserController from '../../controllers/UserController';

import AuthMiddleware from '../../middleware/Auth';
import validationMiddleware from '../../middleware/Validation';
import grantAccessMiddleware from '../../middleware/GrandAccess';

import { CreateUser, UpdateUser } from '../../validation/user';

export default class UserRouter implements IRoute {
  public path = '/users';
  public router = Router();

  private readonly routeController: UserController;

  constructor() {
    this.routeController = new UserController();

    this.initializeRoutes();
  }

  /**
   * @swagger
   *
   * tags:
   *  name: User
   *  description: API to manage your user.
   *
   * definitions:
   *  User:
   *    properties:
   *      id:
   *        type: number
   *        default: 1
   *      uuid:
   *        type: string
   *        default: c02976a0-8c53-40dd-81cb-96c1560163ba
   *      firstname:
   *        type: string
   *        default: John
   *      lastname:
   *        type: string
   *        default: Doe
   *      email:
   *        type: string
   *        default: john_doe@mail.com
   *      gender:
   *        type: string
   *        default: male
   *  UserUpdate:
   *    properties:
   *      firstname:
   *        type: string
   *        default: Jane
   *      lastname:
   *        type: string
   *        default: Doe
   *      email:
   *        type: string
   *        default: jane_doe@mail.com
   *      gender:
   *        type: string
   *        default: female
   *  UserCreate:
   *    properties:
   *      firstname:
   *        type: string
   *        default: John
   *      lastname:
   *        type: string
   *        default: Doe
   *      email:
   *        type: string
   *        default: john_doe@mail.com
   *      password:
   *        type: string
   *        default: John_123
   *      gender:
   *        description: Gender Allow (male, female)
   *        type: string
   *        default: male
   */
  private initializeRoutes() {
    /**
     * @swagger
     * /users:
     *  post:
     *    summary: Create a new user
     *    tags:
     *      - User
     *    produces:
     *      - application/json
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/definitions/UserCreate"
     *    responses:
     *      201:
     *        description: The created user.
     *      400:
     *        description: Bad request.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     *      5XX:
     *        description: Unexpected error.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/definitions/Response"
     */
    this.router.post(this.path, validationMiddleware(CreateUser), this.routeController.createUser);
}
