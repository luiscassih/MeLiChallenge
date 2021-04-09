import { Request, Response } from 'express';
import Axios from 'axios';
import renderHtml from '@/lib/renderHtml';
import itemsView from './itemsView';
import itemsDetailView from "./itemsDetailView";
import { StringUtils } from '@/lib/utils';
import { ItemsDetailProps, ItemsProps } from '.';

class Home {
  async getItemsByQuery(req: Request, res: Response) {
    const searchQuery = StringUtils.sanitizeString(req.query.search as string);
    const author = {
      name: "Luis",
      lastname: "Cassih"
    };
    // add hidden value for author name/lastname

    try {
      const proxyQueryResult = await Axios.post("/api/items?search=" + searchQuery, {
        author: author
      });
      if (proxyQueryResult.data) {
        // const props: ItemsProps = {
        //   author: author,
        //   items: items,
        //   searchQuery: searchQuery,
        //   categories: categories
        // };
        res.send(renderHtml({
          component: itemsView,
          props: proxyQueryResult.data,
          head: "<title>Mercado Libre</title>"
        }));
      } else {
        throw new Error('Invalid received data.');
      }
    } catch(err) {
      res.status(500).send(err.message);
      throw new Error('Error:' + err.message);
    }
  }
  async getItemById(req: Request, res: Response) {
    const requestedItemId = StringUtils.sanitizeString(req.query.search as string);
    // if (isNaN(requestedItemId)) {
    //   res.redirect("/items");
    //   return;
    // }
    console.log("requested item id:", requestedItemId);
    const categories = ["Electronica, Audio y Video", "iPod", "Reproductores", "iPod touch", "32 GB"];
    const props: ItemsDetailProps = {
      item: {},
      categories: categories
    };
    res.send(renderHtml({
      component: itemsDetailView,
      props: props,
      head: "<title>Mercado Libre - Item #" + requestedItemId + "</title>"
    }));
  }
}
export default new Home;