import { Request, Response } from 'express';
import renderHtml from '@/client/components/common/renderHtml';
import itemsView from './itemsView';

class Home {
  async getAllItems(req: Request, res: Response) {
    const items = [
      "1", "dos", "33333"
    ]
    res.send(renderHtml({
      component: itemsView,
      props: { items: items },
      head: "<title>Mercado Libre</title>"
    }));
  }
}
export default new Home;