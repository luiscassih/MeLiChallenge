import { Request, Response } from 'express';
import renderHtml from '@/lib/renderHtml';
import itemsView from './itemsView';
import { StringUtils } from '@/lib/utils';
import { ItemsProps } from '.';

class Home {
  async getAllItems(req: Request, res: Response) {
    const searchQuery = StringUtils.sanitizeString(req.query.search as string);
    console.log("searched query:", searchQuery);
    const items = [
      "1", "dos", "33333"
    ]
    const categories = ["Electronica, Audio y Video", "iPod", "Reproductores", "iPod touch", "32 GB"];
    const props: ItemsProps = {
      items: items,
      searchQuery: searchQuery,
      categories: categories
    }
    res.send(renderHtml({
      component: itemsView,
      props: props,
      head: "<title>Mercado Libre</title>"
    }));
  }
}
export default new Home;