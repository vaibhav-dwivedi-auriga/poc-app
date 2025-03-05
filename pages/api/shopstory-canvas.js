import { ShopstoryServer } from "@shopstory/core";
import { createShopstoryConfig } from "../../lib/shopstoryConfig";

export default async function handler(req, res) {
  const shopstory = new ShopstoryServer(createShopstoryConfig());

  const response = await shopstory.handleCanvasRequest(req);

  res.status(response.status).json(response.body);
}
