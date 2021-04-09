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
    try {
      // Estas query se podrian mover a la vista si no se quiere hacer el rendering de los productos en el server
      const proxyQueryResult = await Axios.post("/api/items?search=" + searchQuery, {
        author: author
      });
      if (proxyQueryResult.data) {
        const props :ItemsProps = proxyQueryResult.data;
        res.send(renderHtml({
          component: itemsView,
          props: props,
          head: "<title>Mercado Libre - " + props.searchQuery + "</title>"
        }));
      } else {
        throw new Error('Invalid received data.');
      }
    } catch(err) {
      if (err.response.status == 404) {
        res.status(404).redirect("/404");
        return;
      }
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
        const props :ItemsDetailProps = proxyQueryResult.data;
        res.send(renderHtml({
          component: itemsDetailView,
          props: props,
          head: "<title>Mercado Libre - " + props.item.title +"</title>"
        }));
      } else {
        throw new Error('Invalid received data.');
      }
    } catch (err) {
      if (err.response.status == 404) {
        res.status(404).redirect("/404");
        return;
      }
      res.status(500).send(err.message);
      throw new Error('Error:' + err.message);
    }
  }
}
export default new Home;