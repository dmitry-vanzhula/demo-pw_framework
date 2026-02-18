import { z } from 'zod';
import {
    getAllProductsResponseSchema,
    messageResponseSchema,
    brandsResponseSchema,
    searchProductsResponseSchema,
} from './schemas';

export type ApiRequestParams = {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | null;
    form?: { [key: string]: string|number|boolean; }|FormData;
    headers?: string;
};

export type ApiRequestResponse<T = unknown> = {
    status: number;
    body: T;
};

export type ApiRequestFn = <T = unknown>(
params: ApiRequestParams) => Promise<ApiRequestResponse<T>>;

export type ApiRequestMethods = {
    apiRequest: ApiRequestFn;
}

export type GetAllProductsResponse = z.infer<typeof getAllProductsResponseSchema>;
export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type BrandsResponse = z.infer<typeof brandsResponseSchema>;
export type SearchProductsResponse = z.infer<typeof searchProductsResponseSchema>;