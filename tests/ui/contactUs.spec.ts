import { test, expect } from '../../fixtures/pom/test-options';
import { faker } from '@faker-js/faker';

test.describe('Contact Us', () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const subject = faker.lorem.sentence();
    const message = faker.lorem.paragraph();
    const expectedDialogMessage = 'Press OK to proceed!';

    test(
        'Submit contact form and verify success message',
        { tag: ['@ContactUs', '@E2E'] },
        async ({ page, navPage, contactPage }) => {
            let dialogMessage = '';

            await test.step('Navigate to Contact Us page', async () => {
                await navPage.navigateToContactUsPage();
                await contactPage.verifyContactPageLoaded();
            });

            await test.step('Set up dialog listener', async () => {
                page.on('dialog', async (dialog) => {
                    dialogMessage = dialog.message();
                    await dialog.accept();
                });
            });

            await test.step('Fill and submit contact form', async () => {
                await contactPage.fillContactForm(
                    name,
                    email,
                    subject,
                    message
                );

                await contactPage.submitForm();

                await expect
                    .poll(() => dialogMessage, { timeout: 10000 })
                    .toContain(expectedDialogMessage);
            });

            await test.step('Verify success message on page', async () => {
                await contactPage.verifySuccessMessage();
            });
        }
    );

    test(
        'Contact form displays all required fields',
        { tag: ['@ContactUs', '@E2E'] },
        async ({ navPage, contactPage }) => {
            await test.step('Navigate to Contact Us page', async () => {
                await navPage.navigateToContactUsPage();
            });

            await test.step('Verify all form fields are visible', async () => {
                await expect(contactPage.nameInput).toBeVisible();
                await expect(contactPage.emailInput).toBeVisible();
                await expect(contactPage.subjectInput).toBeVisible();
                await expect(contactPage.messageInput).toBeVisible();
                await expect(contactPage.submitButton).toBeVisible();
            });
        }
    );
});
