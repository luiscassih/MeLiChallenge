import { Request, Response } from 'express';
import Axios from 'axios';
import renderHtml from '@/lib/renderHtml';
import itemsView from './itemsView';
import itemsDetailView from "./itemsDetailView";
import { StringUtils } from '@/lib/utils';

class Home {
  async getItemsByQuery(req: Request, res: Response) {
    const searchQuery = StringUtils.sanitizeString(req.query.search as string);
    const author = {
      name: "Luis",
      lastname: "Cassih"
    };
    try {
      const proxyQueryResult = await Axios.post("/api/items?search=" + searchQuery, {
        author: author
      });
      if (proxyQueryResult.data) {
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
    const requestedItemId = StringUtils.sanitizeString(req.params.id as string);
    const author = {
      name: "Luis",
      lastname: "Cassih"
    };
    try {
      const proxyQueryResult = await Axios.post("/api/items/" + requestedItemId, {
        author: author
      });
      if (proxyQueryResult.data) {
        res.send(renderHtml({
          component: itemsDetailView,
          props: proxyQueryResult.data,
          head: "<title>Mercado Libre</title>"
        }));
      } else {
        throw new Error('Invalid received data.');
      }
    } catch (err) {
      res.status(500).send(err.message);
      throw new Error('Error:' + err.message);
    }
  }
}
export default new Home;