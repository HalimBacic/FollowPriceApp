/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductType } from './ProductType';
import type { Quantityenum } from './Quantityenum';
import type { StoreDtoSimple } from './StoreDtoSimple';
export type ProductDto = {
    barcode: string;
    name: string;
    producttype: ProductType;
    producer: string;
    quantitytype: Quantityenum;
    quantityprice: number;
    weight: number;
    diff: number;
    expdate: string;
    stores: Array<StoreDtoSimple>;
};

