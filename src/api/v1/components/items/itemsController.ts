import { Request, Response } from 'express';
import Axios from 'axios';
import { StringUtils } from '@/lib/utils';
import { Item, ItemsProps, ItemsDetailProps } from "./";

class Items {
  async getItemsByQuery(req: Request, res: Response) {

    const searchQuery = StringUtils.sanitizeString(req.query.search as string);
    const author = {
      name: StringUtils.sanitizeString(req.body.author.name as string),
      lastname: StringUtils.sanitizeString(req.body.author.lastname as string)
    };
    try {
      const proxyQueryResult = await Axios.get("https://api.mercadolibre.com/sites/MLA/search?q=" + searchQuery);
      const queryData = proxyQueryResult.data;
      if (queryData) {
        const items: Item[] = []
        queryData.results.slice(0,4).forEach((resultItem: any) => {
          // fixed to4 results for this challenge
          items.push({
            id: resultItem.id,
            title: resultItem.title,
            price: {
              currency: resultItem.currency_id,
              amount: resultItem.price,
              decimals: 0
            },
            picture: resultItem.thumbnail,
            condition: resultItem.condition,
            free_shipping: resultItem.shipping.free_shipping,
            state_name: resultItem.address.state_name
          });
        });
        const categories: string[] = [];

        let resultCategories = queryData.filters.find((o: any) => o.id === "category");
        if (resultCategories) {
          const categoryValue: any = resultCategories.values && resultCategories.values[0];
          const categoryPath: string[] = categoryValue["path_from_root"];
          categoryPath.forEach((category: any ) => {
            categories.push(category.name);
          });
        } else {
          resultCategories = queryData.available_filters.find((o: any) => o.id === "category");
          if (resultCategories) {
            let resultCategoriesSorted = resultCategories.values.sort((a: any, b: any) => (a.results < b.results) ? 1 : -1);
            if (resultCategoriesSorted.length >= 4) {
              resultCategoriesSorted = resultCategoriesSorted.slice(0,3);
            }
            resultCategoriesSorted.forEach((cat: any) => categories.push(cat.name));
          } else {console.log("no category found");}
        }

        const result :ItemsProps = {
          author: author,
          items: items,
          searchQuery: searchQuery,
          categories: categories
        }
        res.status(200).send(result);
      }
    } catch(err) {
      res.status(500).send(err.message);
      throw new Error('Error retrieving data from MercadoLibre API: '+ err.message);
    }
  }
}
export default new Items;