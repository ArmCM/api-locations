import { Request, Response } from 'express';

export default class IndexController {
  /**
   *
   * @param {Request} req Request object
   * @param {Response} res Response Object
   */
  async welcome(req: Request, res: Response): Promise<Response> {
    return res.json({
      status: true,
      message: 'API for locate stores - Technical Test: Fullstack Developer'
    });
  }
}
