import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Simplified helper for making API requests and returning the status and JSON body.
 * This helper automatically performs the request based on the provided method, URL, body, and headers.
 *
 * @param {Object} params - The parameters for the request.
 * @param {APIRequestContext} params.request - The Playwright request object, used to make the HTTP request.
 * @param {string} params.method - The HTTP method to use (POST, GET, PUT, DELETE).
 * @param {string} params.url - The URL to send the request to.
 * @param {string} [params.baseUrl] - The base URL to prepend to the request URL.
 * @param {Record<string, unknown> | null} [params.body=null] - The body to send with the request (for POST and PUT requests).
 * @param {Record<string, string> | undefined} [params.headers=undefined] - The headers to include with the request.
 * @returns {Promise<{ status: number; body: unknown }>} - An object containing the status code and the parsed response body.
 *    - `status`: The HTTP status code returned by the server.
 *    - `body`: The parsed JSON response body from the server.
 */
export async function apiRequest({
    request,
    method,
    url,
    baseUrl,
    body = null,
    form,
    headers,
}: {
    request: APIRequestContext;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | null;
    form?: { [key: string]: string|number|boolean; }|FormData;
    headers?: string;
}): Promise<{ status: number; body: unknown }> {
    
    let response: APIResponse;

    const options: { 
        data?: Record<string, unknown>; 
        form?: any; 
        headers?: Record<string, string> } = {};

    // Send JSON body if provided
    if (body) options.data = body;

    // Send form-urlencoded if provided
    if (form) options.form = form;

    // Merge headers
    options.headers = {
        ...(headers ? JSON.parse(headers) : {}),
        'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json',
    };

    const fullUrl = baseUrl ? `${baseUrl}${url}` : url;
    console.log('fullUrl', fullUrl);
    console.log('options', options);

    switch (method.toUpperCase()) {
        case 'POST':
            response = await request.post(fullUrl, options);
            console.log('response', response);
            break;
        case 'GET':
            response = await request.get(fullUrl, options);
            console.log('response', response);
            break;
        case 'PUT':
            response = await request.put(fullUrl, options);
            console.log('response', response);
            break;
        case 'DELETE':
            response = await request.delete(fullUrl, options);
            console.log('response', response);
            break;
        default:
            throw new Error(`Unsupported HTTP method: ${method}`);
    }

    const status = response.status();

    let bodyData: unknown = null;
    const contentType = response.headers()['content-type'] || '';

    try {
        if (contentType.includes('application/json')) {
            bodyData = await response.json();
        } else if (contentType.includes('text/')) {
            const text = await response.text();
            try {
                bodyData = JSON.parse(text);
            } catch {
                bodyData = text;
            }
        }
    } catch (err) {
        console.warn(
            `Failed to parse response body for status ${status}: ${err}`
        );
    }

    return { status, body: bodyData };
}