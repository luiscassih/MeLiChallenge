import { Request, Response } from 'express';
class Items {
  async getAllItems(req: Request, res: Response) {
    try {
      res.send({items: ['1','2']});
    } catch(err) {
      res.status(400).send(err.message);
    }
  }
}
export default new Items;