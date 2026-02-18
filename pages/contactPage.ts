import { expect, Locator, Page } from '@playwright/test';

class ContactPage {
    constructor(private page: Page) {}

    get contactUsHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Contact Us' });
    }

    get nameInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Name' });
    }

    get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email', exact: true });
    }

    get subjectInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Subject' });
    }

    get messageInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Your Message Here' });
    }

    get submitButton(): Locator {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    get successMessage(): Locator {
        return this.page
            .locator('#contact-page')
            .getByText('Success! Your details have been submitted successfully.');
    }

    async fillContactForm(
        name: string,
        email: string,
        subject: string,
        message: string
    ): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async fillAndSubmitContactForm(
        name: string,
        email: string,
        subject: string,
        message: string
    ): Promise<void> {
        await this.fillContactForm(name, email, subject, message);
        await this.submitForm();
    }

    async verifyContactPageLoaded(): Promise<void> {
        await expect(this.contactUsHeading).toBeVisible();
    }

    async verifySuccessMessage(): Promise<void> {
        await expect(this.successMessage).toBeVisible();
    }
}

export default ContactPage;
