import { test as setup } from '../../fixtures/pom/test-options';

setup('auth user', async ({ homePage, navPage, page }) => {
    await homePage.navigateToHomePageGuest();
    await navPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await page.context().storageState({ path: '.auth/userSession.json' });
});
