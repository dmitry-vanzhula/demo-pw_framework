import { z } from 'zod';

export const getAllProductsResponseSchema = z.object({
    responseCode: z.number(),
    products: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.string(),
        brand: z.string(),
        category: z.object({
            usertype: z.object({
                usertype: z.string(),
            }),
            category: z.string(),
        }),
    })),
});

export const messageResponseSchema = z.object({
    responseCode: z.number(),
    message: z.string(),
});

export const brandsResponseSchema = z.object({
    responseCode: z.number(),
    brands: z.array(z.object({
        id: z.number(),
        brand: z.string(),
    })),
});

export const searchProductsResponseSchema = z.object({
    responseCode: z.number(),
    products: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.string(),
        brand: z.string(),
        category: z.object({
            usertype: z.object({
                usertype: z.string(),
            }),
            category: z.string(),
        }),
    })),
});