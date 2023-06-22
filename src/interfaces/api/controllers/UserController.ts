import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';

import BcryptManager from '../../../infrastructure/security/BcryptManager';

import UserSerializer from '../serializers/user/UserSerializer';
import { Pagination, Paginate } from '../Pagination';

import GetUser from '../../../application/use_cases/user/GetUser';
import CreateUser from '../../../application/use_cases/user/CreateUser';
import GetAllUsers from '../../../application/use_cases/user/GetAllUsers';
import RemoveUser from '../../../application/use_cases/user/RemoveUser';
import UpdateUser from '../../../application/use_cases/user/UpdateUser';

import UserRepositoryMongo from '../../../infrastructure/repositories/user/UserRepositoryMongo';

export default class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req;

    try {
      const user = await CreateUser(body, new UserRepositoryMongo(), new BcryptManager());
      const userSerializer = UserSerializer.getInstance();

      return res.status(httpStatus.CREATED).send(userSerializer.singleSerialize(user));
    } catch (error) {
      next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    }
  }
}
