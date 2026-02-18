import { test, expect } from '../../fixtures/pom/test-options';
import {
    searchProductsResponseSchema,
    messageResponseSchema,
} from '../../fixtures/api/schemas';
import {
    SearchProductsResponse,
    MessageResponse,
} from '../../fixtures/api/types-guards';

const baseUrl = process.env.API_URL;

test.describe('API - Search Product', () => {
    test(
        'API 5: POST To Search Product with search_product returns 200',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            const { status, body } = await apiRequest<SearchProductsResponse>({
                method: 'POST',
                url: '/searchProduct',
                baseUrl,
                form: { search_product: 'top' },
            });
            expect(status).toBe(200);
            expect(searchProductsResponseSchema.parse(body)).toBeTruthy();
        }
    );

    test(
        'API 6: POST To Search Product without search_product returns 400',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            const { body } = await apiRequest<MessageResponse>({
                method: 'POST',
                url: '/searchProduct',
                baseUrl,
                form: {},
            });
            expect(messageResponseSchema.parse(body)).toBeTruthy();
            expect((body as MessageResponse).responseCode).toBe(400);
            expect((body as MessageResponse).message).toContain(
                'search_product'
            );
        }
    );
});
