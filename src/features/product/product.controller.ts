import { Request, Response } from "express";
import * as ProductService from "./product.service";
import { CreateProductsParams, ProductListParams } from "./schema";

export const getProductList = async (req: Request, res: Response) => {
  const { query } = (req as any).parsedData as ProductListParams;

  const limit = query.perPage || 10;
  const offset = ((query.page || 1) - 1) * limit;

  const products = await ProductService.getProductList({ limit, offset });

  res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(req.params.id);

  if (!product) {
    return res.sendStatus(404);
  }

  res.status(200).json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const adminId = (req.user as any).id;
  const { body } = (req as any).parsedData as CreateProductsParams;

  const product = await ProductService.createProduct({
    ...body,
    createdById: adminId,
  });

  res.json(product);
};
