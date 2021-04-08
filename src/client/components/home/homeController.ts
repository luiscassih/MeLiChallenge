import { Request, Response } from 'express';
import renderHtml from '@/client/components/common/renderHtml';
import homeView from './homeView';

class Home {
  async getHome(req: Request, res: Response) {
    res.send(renderHtml({
      component: homeView,
      props: {},
      head: "<title>Mercado Libre</title>"
    }));
  }
}
export default new Home;