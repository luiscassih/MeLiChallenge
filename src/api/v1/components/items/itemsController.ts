import { query, Request, Response } from 'express';
import Axios from 'axios';
import { StringUtils } from '@/lib/utils';
import { Item, ItemsProps, ItemsDetailProps, ItemDetail } from "./";

class Items {
  async getItemsByQuery(req: Request, res: Response) {
    const searchQuery = StringUtils.sanitizeString(req.query.search as string);
    if (!req.body.author) {
      res.sendStatus(400);
      return;
    }
    const author = {
      name: StringUtils.sanitizeString(req.body.author.name as string),
      lastname: StringUtils.sanitizeString(req.body.author.lastname as string)
    };
    try {
      const proxyQueryResult = await Axios.get("https://api.mercadolibre.com/sites/MLA/search?q=" + searchQuery);
      const queryData = proxyQueryResult.data;
      if (queryData) {
        // Building item list
        const items: Item[] = []
        queryData.results.slice(0,4).forEach((resultItem: any) => {
          // fixed to 4 results for this challenge
          items.push({
            id: resultItem.id,
            title: resultItem.title,
            price: {
              currency: resultItem.currency_id,
              amount: Math.trunc(resultItem.price),
              decimals: ((resultItem.price % 1) as any).toFixed(2) * 100
            },
            picture: resultItem.thumbnail,
            condition: resultItem.condition,
            free_shipping: resultItem.shipping.free_shipping,
            state_name: resultItem.address.state_name
          });
        });

        // Building categories
        const categories: string[] = [];
        let resultCategories = queryData.filters.find((o: any) => o.id === "category");
        if (resultCategories) {
          // categories will be "filters"
          const categoryValue: any = resultCategories.values && resultCategories.values[0];
          const categoryPath: string[] = categoryValue["path_from_root"];
          categoryPath.forEach((category: any ) => {
            categories.push(category.name);
          });
        } else {
          // categories will be "available_filters instead"
          resultCategories = queryData.available_filters.find((o: any) => o.id === "category");
          if (resultCategories) {
            let resultCategoriesSorted = resultCategories.values.sort((a: any, b: any) => (a.results < b.results) ? 1 : -1);
            if (resultCategoriesSorted.length >= 4) {
              resultCategoriesSorted = resultCategoriesSorted.slice(0,3);
            }
            resultCategoriesSorted.forEach((cat: any) => categories.push(cat.name));
          }
        }

        // Prepare data and send to consumer
        const result :ItemsProps = {
          author: author,
          items: items,
          searchQuery: searchQuery,
          categories: categories
        }
        res.status(200).send(result);
      }
    } catch(err) {
      if (err.response.status == 404) {
        res.sendStatus(404);
        return;
      }
      res.status(500).send(err.message);
      throw new Error('Error retrieving data from MercadoLibre API: '+ err.message);
    }
  }

  async getItemById(req: Request, res: Response) {
    const author = {
      name: StringUtils.sanitizeString(req.body.author.name as string),
      lastname: StringUtils.sanitizeString(req.body.author.lastname as string)
    };
    const requestedId: string = StringUtils.sanitizeString(req.params.id as string);

    try {
      let proxyQueryResult = await Axios.get("https://api.mercadolibre.com/items/" + requestedId);
      if (proxyQueryResult.data) {
        const queryData = proxyQueryResult.data;
        // Building item
        const item: ItemDetail = {
          id: queryData.id,
          title: queryData.title,
          price: {
            currency: queryData.currency_id,
            amount: Math.trunc(queryData.price),
            decimals: ((queryData.price % 1) as any).toFixed(2) * 100
          },
          picture: queryData.pictures[0].url,
          condition: queryData.condition,
          free_shipping: queryData.shipping.free_shipping,
          sold_quantity: queryData.sold_quantity,
          description: "", 
        }

        // Getting description
        proxyQueryResult = await Axios.get("https://api.mercadolibre.com/items/" + requestedId + "/description");
        if (proxyQueryResult.data) {
          item.description = proxyQueryResult.data.plain_text;
        }

        // Getting categories
        const categories: string[] = [];
        proxyQueryResult = await Axios.get("https://api.mercadolibre.com/categories/" + queryData.category_id);
        if (proxyQueryResult.data) {
          const categoryValue: any = proxyQueryResult.data;
          const categoryPath: string[] = categoryValue["path_from_root"];
          categoryPath.forEach((category: any ) => {
            categories.push(category.name);
          });
        }

        // Prepare data and send to consumer
        const result :ItemsDetailProps = {
          author: author,
          item: item,
          categories: categories
        }
        res.status(200).send(result);
      }
    } catch(err) {
      if (err.response.status == 404) {
        res.sendStatus(404);
        return;
      }
      res.status(500).send(err.message);
      throw new Error('Error retrieving data from MercadoLibre API: '+ err.message);
    }
  }
}
export default new Items;