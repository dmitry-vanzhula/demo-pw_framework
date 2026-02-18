import { test, expect } from '../../fixtures/pom/test-options';
import { getAllProductsResponseSchema } from '../../fixtures/api/schemas';
import { GetAllProductsResponse } from '../../fixtures/api/types-guards';

const baseUrl = process.env.API_URL;

test.describe('API - Products List', () => {
    test(
        'API 1: GET All Products List returns 200 and valid products',
        { tag: ['@Api', '@Products'] },
        async ({ apiRequest }) => {
            await test.step(
                'GET /productsList and verify response',
                async () => {
                    const { status, body } = await apiRequest<GetAllProductsResponse>({
                        method: 'GET',
                        url: '/productsList',
                        baseUrl,
                    });
                    expect(status).toBe(200);
                    expect(getAllProductsResponseSchema.parse(body)).toBeTruthy();
                }
            );
        }
    );

    test(
        'API 2: POST To All Products List returns 405',
        { tag: ['@Api', '@Products'] },
        async ({ apiRequest }) => {
            await test.step(
                'POST /productsList and verify 405 response',
                async () => {
                    const { body } = await apiRequest<{
                        responseCode: number;
                        message: string;
                    }>({
                        method: 'POST',
                        url: '/productsList',
                        baseUrl,
                        body: {},
                    });
                    expect((body as { responseCode: number }).responseCode).toBe(405);
                    expect((body as { message: string }).message).toContain(
                        'not supported'
                    );
                }
            );
        }
    );
});
