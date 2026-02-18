import { test, expect } from '../../fixtures/pom/test-options';
import {
    brandsResponseSchema,
    messageResponseSchema,
} from '../../fixtures/api/schemas';
import {
    BrandsResponse,
    MessageResponse,
} from '../../fixtures/api/types-guards';

const baseUrl = process.env.API_URL;

test.describe('API - Brands List', () => {
    test(
        'API 3: GET All Brands List returns 200 and valid brands',
        { tag: ['@Api', '@Brands'] },
        async ({ apiRequest }) => {
            await test.step(
                'GET /brandsList and verify response',
                async () => {
                    const { status, body } = await apiRequest<BrandsResponse>({
                        method: 'GET',
                        url: '/brandsList',
                        baseUrl,
                    });
                    expect(status).toBe(200);
                    expect(brandsResponseSchema.parse(body)).toBeTruthy();
                }
            );
        }
    );

    test(
        'API 4: PUT To All Brands List returns 405',
        { tag: ['@Api', '@Brands'] },
        async ({ apiRequest }) => {
            await test.step('PUT /brandsList and verify 405 response', async () => {
                const { body } = await apiRequest<MessageResponse>({
                    method: 'PUT',
                    url: '/brandsList',
                    baseUrl,
                    body: {},
                });
                expect(messageResponseSchema.parse(body)).toBeTruthy();
                expect((body as MessageResponse).responseCode).toBe(405);
                expect((body as MessageResponse).message).toContain(
                    'not supported'
                );
            });
        }
    );
});
