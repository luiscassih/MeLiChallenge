import { Request, Response } from 'express';
import renderHtml from '@/lib/renderHtml';
import homeView from './homeView';
import NotFound from "../common/NotFoundPage";

class Home {
  async getHome(req: Request, res: Response) {
    res.send(renderHtml({
      component: homeView,
      props: {},
      head: "<title>Mercado Libre</title>"
    }));
  }
  async getNotFound(req: Request, res: Response) {
    res.send(renderHtml({
      component: NotFound,
      props: {},
      head: "<title>Mercado Libre - Not Found</title>"
    }));
  }
}
export default new Home;