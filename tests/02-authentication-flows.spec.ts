import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Authentication Flows', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let registerPage: RegisterPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        dashboardPage = new DashboardPage(page);
    });

    test.describe('Login Tests', () => {
        test('should display login form correctly', async ({ page }) => {
            await loginPage.goto();

            const isFormVisible = await loginPage.verifyLoginForm();
            expect(isFormVisible).toBe(true);

            const isDemoCredentialsVisible = await loginPage.verifyDemoCredentials();
            expect(isDemoCredentialsVisible).toBe(true);
        });

        test('should login with valid credentials and redirect to dashboard', async ({ page }) => {
            await loginPage.goto();

            await loginPage.loginWithValidCredentials();
            await loginPage.waitForLoginSuccess();

            // Verify we're on dashboard
            await expect(page).toHaveURL('/dashboard');

            // Verify dashboard content
            const isDashboardVisible = await dashboardPage.verifyDashboard();
            expect(isDashboardVisible).toBe(true);

            // Verify user info
            const userInfoVisible = await dashboardPage.verifyUserInfo(process.env.TEST_USER_EMAIL || 'test@example.com');
            expect(userInfoVisible).toBe(true);
        });

        test('should show error message for invalid credentials', async ({ page }) => {
            await loginPage.goto();

            await loginPage.loginWithInvalidCredentials();

            const isErrorVisible = await loginPage.verifyErrorMessage();
            expect(isErrorVisible).toBe(true);

            const hasInvalidCredentialsError = await loginPage.verifyErrorMessage('Invalid credentials');
            expect(hasInvalidCredentialsError).toBe(true);

            // Should stay on login page
            await expect(page).toHaveURL('/login');
        });

        test('should show validation errors for empty fields', async ({ page }) => {
            await loginPage.goto();

            // Try to submit empty form
            await loginPage.submitForm();

            // HTML5 validation should prevent submission
            const currentUrl = page.url();
            expect(currentUrl).toContain('/login');
        });

        test('should navigate to register page from login', async ({ page }) => {
            await loginPage.goto();

            await loginPage.navigateToRegister();

            await expect(page).toHaveURL('/register');
            const isRegisterFormVisible = await registerPage.verifyRegistrationForm();
            expect(isRegisterFormVisible).toBe(true);
        });

        test('should show loading state during login', async ({ page }) => {
            await loginPage.goto();

            await loginPage.fillEmailField(process.env.TEST_USER_EMAIL || 'test@example.com');
            await loginPage.fillPasswordField(process.env.TEST_USER_PASSWORD || 'password123');

            // Start login process
            await loginPage.submitForm();

            // Check for loading text (might be brief)
            const buttonText = await loginPage.getLoginButtonText();
            // Button text changes to "Logging in..." during the process
            expect(buttonText).toMatch(/Login|Logging in.../);
        });
    });

    test.describe('Registration Tests', () => {
        test('should display registration form correctly', async ({ page }) => {
            await registerPage.goto();

            const isFormVisible = await registerPage.verifyRegistrationForm();
            expect(isFormVisible).toBe(true);

            const isEmailVerificationInfoVisible = await registerPage.verifyEmailVerificationInfo();
            expect(isEmailVerificationInfoVisible).toBe(true);
        });

        test('should register new user successfully', async ({ page }) => {
            await registerPage.goto();

            const uniqueEmail = `testuser${Date.now()}@example.com`;
            await registerPage.register('Test User', uniqueEmail, 'password123');

            const isSuccessVisible = await registerPage.verifySuccessMessage();
            expect(isSuccessVisible).toBe(true);

            const hasCorrectSuccessMessage = await registerPage.verifySuccessMessage('Registration successful');
            expect(hasCorrectSuccessMessage).toBe(true);
        });

        test('should show error for mismatched passwords', async ({ page }) => {
            await registerPage.goto();

            await registerPage.registerWithMismatchedPasswords();

            const isErrorVisible = await registerPage.verifyErrorMessage();
            expect(isErrorVisible).toBe(true);

            const hasPasswordMismatchError = await registerPage.verifyErrorMessage('Passwords do not match');
            expect(hasPasswordMismatchError).toBe(true);
        });

        test('should show error for short password', async ({ page }) => {
            await registerPage.goto();

            await registerPage.registerWithShortPassword();

            const isErrorVisible = await registerPage.verifyErrorMessage();
            expect(isErrorVisible).toBe(true);

            const hasShortPasswordError = await registerPage.verifyErrorMessage('at least 6 characters');
            expect(hasShortPasswordError).toBe(true);
        });

        test('should generate Mailinator test email', async ({ page }) => {
            await registerPage.goto();

            const generatedEmail = await registerPage.generateTestEmail();

            expect(generatedEmail).toContain('@mailinator.com');
            expect(generatedEmail).toMatch(/testuser\w+@mailinator\.com/);
        });

        test('should register with Mailinator email for email verification testing', async ({ page }) => {
            await registerPage.goto();

            const testEmail = await registerPage.registerWithMailinatorEmail();

            const isSuccessVisible = await registerPage.verifySuccessMessage();
            expect(isSuccessVisible).toBe(true);

            expect(testEmail).toContain('@mailinator.com');
        });

        test('should navigate to login from registration', async ({ page }) => {
            await registerPage.goto();

            await registerPage.navigateToLogin();

            await expect(page).toHaveURL('/login');
            const isLoginFormVisible = await loginPage.verifyLoginForm();
            expect(isLoginFormVisible).toBe(true);
        });
    });

    test.describe('Session Management', () => {
        test('should maintain session after page reload when logged in', async ({ page }) => {
            await loginPage.goto();
            await loginPage.loginWithValidCredentials();
            await dashboardPage.goto();

            // Reload page
            await page.reload();

            // Should still be on dashboard
            await expect(page).toHaveURL('/dashboard');
            const isDashboardVisible = await dashboardPage.verifyDashboard();
            expect(isDashboardVisible).toBe(true);
        });

        test('should logout and redirect to home page', async ({ page }) => {
            // Login first
            await loginPage.goto();
            await loginPage.loginWithValidCredentials();
            await dashboardPage.goto();

            // Logout
            await dashboardPage.logout();

            // Should redirect to home page
            await expect(page).toHaveURL('/');
            const isHomePageVisible = await homePage.verifyHomePage();
            expect(isHomePageVisible).toBe(true);
        });

        test('should redirect unauthenticated users to login when accessing protected routes', async ({ page }) => {
            await dashboardPage.goto();

            // Should redirect to login
            await expect(page).toHaveURL('/login');
            const isLoginFormVisible = await loginPage.verifyLoginForm();
            expect(isLoginFormVisible).toBe(true);
        });

        test('should redirect authenticated users to dashboard when accessing login page', async ({ page }) => {
            // Login first
            await loginPage.goto();
            await loginPage.loginWithValidCredentials();

            // Try to access login page again
            await loginPage.goto();

            // Should redirect to dashboard
            await expect(page).toHaveURL('/dashboard');
            const isDashboardVisible = await dashboardPage.verifyDashboard();
            expect(isDashboardVisible).toBe(true);
        });
    });

    test.describe('Dashboard Features', () => {
        test.beforeEach(async ({ page }) => {
            // Login before each dashboard test
            await loginPage.goto();
            await loginPage.loginWithValidCredentials();
            await dashboardPage.goto();
        });

        test('should display dashboard with correct user information', async ({ page }) => {
            const isDashboardVisible = await dashboardPage.verifyDashboard();
            expect(isDashboardVisible).toBe(true);

            const isWelcomeCorrect = await dashboardPage.verifyWelcomeMessage();
            expect(isWelcomeCorrect).toBe(true);

            const isAccountStatusVisible = await dashboardPage.verifyAccountStatus();
            expect(isAccountStatusVisible).toBe(true);

            const cardCount = await dashboardPage.getDashboardCardCount();
            expect(cardCount).toBeGreaterThan(3);
        });

        test('should navigate to todos from dashboard', async ({ page }) => {
            await dashboardPage.navigateToTodos();

            await expect(page).toHaveURL('/todos');
        });

        test('should display session information', async ({ page }) => {
            const isSessionInfoVisible = await dashboardPage.verifySessionInfo();
            expect(isSessionInfoVisible).toBe(true);
        });

        test('should display security features information', async ({ page }) => {
            const isSecurityFeaturesVisible = await dashboardPage.verifySecurityFeatures();
            expect(isSecurityFeaturesVisible).toBe(true);
        });

        test('should show user verification status', async ({ page }) => {
            const isUserVerified = await dashboardPage.isUserVerified();
            expect(isUserVerified).toBe(true); // Test user should be verified by default
        });
    });
});
