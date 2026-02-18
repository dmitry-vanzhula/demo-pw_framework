import { test, expect } from '../../fixtures/pom/test-options';
import { messageResponseSchema } from '../../fixtures/api/schemas';
import { MessageResponse } from '../../fixtures/api/types-guards';

const baseUrl = process.env.API_URL;
const validEmail = process.env.EMAIL!;
const validPassword = process.env.PASSWORD!;

test.describe('API - Verify Login', () => {
    test(
        'API 7: POST To Verify Login with valid details returns 200',
        { tag: ['@Api', '@Login'] },
        async ({ apiRequest }) => {
            await test.step(
                'POST /verifyLogin with valid credentials and verify 200',
                async () => {
                    const { body } = await apiRequest<MessageResponse>({
                        method: 'POST',
                        url: '/verifyLogin',
                        baseUrl,
                        form: { email: validEmail, password: validPassword },
                    });
                    expect(messageResponseSchema.parse(body)).toBeTruthy();
                    expect((body as MessageResponse).responseCode).toBe(200);
                    expect((body as MessageResponse).message).toContain('User exists');
                }
            );
        }
    );

    test(
        'API 8: POST To Verify Login without email returns 400',
        { tag: ['@Api', '@Login'] },
        async ({ apiRequest }) => {
            await test.step(
                'POST /verifyLogin without email and verify 400',
                async () => {
                    const { body } = await apiRequest<MessageResponse>({
                        method: 'POST',
                        url: '/verifyLogin',
                        baseUrl,
                        form: { password: 'anypassword' },
                    });
                    expect(messageResponseSchema.parse(body)).toBeTruthy();
                    expect((body as MessageResponse).responseCode).toBe(400);
                    expect((body as MessageResponse).message).toContain('email');
                }
            );
        }
    );

    test(
        'API 9: DELETE To Verify Login returns 405',
        { tag: ['@Api', '@Login'] },
        async ({ apiRequest }) => {
            await test.step(
                'DELETE /verifyLogin and verify 405',
                async () => {
                    const { body } = await apiRequest<MessageResponse>({
                        method: 'DELETE',
                        url: '/verifyLogin',
                        baseUrl,
                    });
                    expect(messageResponseSchema.parse(body)).toBeTruthy();
                    expect((body as MessageResponse).responseCode).toBe(405);
                    expect((body as MessageResponse).message).toContain(
                        'not supported'
                    );
                }
            );
        }
    );

    test(
        'API 10: POST To Verify Login with invalid details returns 404',
        { tag: ['@Api', '@Login'] },
        async ({ apiRequest }) => {
            await test.step(
                'POST /verifyLogin with invalid credentials and verify 404',
                async () => {
                    const { body } = await apiRequest<MessageResponse>({
                        method: 'POST',
                        url: '/verifyLogin',
                        baseUrl,
                        form: {
                            email: 'invalid@example.com',
                            password: 'wrongpassword',
                        },
                    });
                    expect(messageResponseSchema.parse(body)).toBeTruthy();
                    expect((body as MessageResponse).responseCode).toBe(404);
                    expect((body as MessageResponse).message).toContain(
                        'User not found'
                    );
                }
            );
        }
    );
});
