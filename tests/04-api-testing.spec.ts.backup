import { test, expect, request } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { TodoPage } from './pages/TodoPage';

test.describe('API Testing with Playwright', () => {
    let loginPage: LoginPage;
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        todoPage = new TodoPage(page);
    });

    test.describe('Authentication API Tests', () => {
        test('should test registration API endpoint', async ({ page }) => {
            // Test registration through UI which calls mock API
            await page.goto('/register');

            const testEmail = `apitest${Date.now()}@example.com`;
            await page.getByTestId('name-input').fill('API Test User');
            await page.getByTestId('email-input').fill(testEmail);
            await page.getByTestId('password-input').fill('password123');
            await page.getByTestId('confirm-password-input').fill('password123');
            await page.getByTestId('register-button').click();

            // Verify success response
            const successMessage = page.getByTestId('success-message');
            await expect(successMessage).toBeVisible();
        });
    });

    test.describe('Todo API Tests', () => {
        test.beforeEach(async ({ page }) => {
            // Clear localStorage before each test
            await page.goto('/todos');
            await page.evaluate(() => {
                localStorage.removeItem('todos');
                window.location.reload();
            });
        });

        test('should test todo CRUD operations via localStorage API', async ({ page }) => {
            await page.waitForLoadState('networkidle');
            await todoPage.goto();
            await page.waitForLoadState('load');

            // CREATE: Add a todo
            await todoPage.addTodo('API Test Todo');

            // READ: Verify todo was stored
            const storedTodos = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('todos') || '[]');
            });

            expect(storedTodos).toHaveLength(1);
            expect(storedTodos[0].text).toBe('API Test Todo');
            expect(storedTodos[0].completed).toBe(false);

            // UPDATE: Complete the todo
            await todoPage.completeTodo(0);

            const updatedTodos = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('todos') || '[]');
            });

            expect(updatedTodos[0].completed).toBe(true);

            // DELETE: Remove the todo
            await todoPage.deleteTodo(0);

            const finalTodos = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('todos') || '[]');
            });

            expect(finalTodos).toHaveLength(0);
        });

        test('should test todo filtering API', async ({ page }) => {
            await page.waitForLoadState('networkidle');
            await todoPage.goto();
            await page.waitForLoadState('load');

            // Setup test data

        test('should test bulk operations API', async ({ page }) => {
            await page.waitForLoadState('networkidle');
            await todoPage.goto();
            await page.waitForLoadState('load');

            // Add multiple todos
            const todoTexts = ['Todo 1', 'Todo 2', 'Todo 3'];
            for (const text of todoTexts) {
                await todoPage.addTodo(text);
            }

            // Complete all todos
            for (let i = 0; i < todoTexts.length; i++) {
                await todoPage.completeTodo(i);
            }

            // Clear completed todos
            await todoPage.clearCompletedTodos();

            // Verify all todos are cleared
            const remainingTodos = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('todos') || '[]');
            });

            expect(remainingTodos).toHaveLength(0);
        });
    });

    test.describe('Email Verification API Tests', () => {
        test('should test email verification API endpoint', async ({ page }) => {
            // Test valid token
            await page.goto('/verify-email?token=valid-token');

            // Wait for verification process
            await page.waitForSelector('[data-testid="success-status"]', { timeout: 10000 });

            const successMessage = await page.getByTestId('success-status').textContent();
            expect(successMessage).toContain('successfully');
        });

        test('should test invalid token handling', async ({ page }) => {
            await page.goto('/verify-email?token=invalid-token');

            // Wait for error state
            await page.waitForSelector('[data-testid="error-status"]', { timeout: 10000 });

            const errorMessage = await page.getByTestId('error-status').textContent();
            expect(errorMessage).toContain('Failed');
        });

        test('should test missing token handling', async ({ page }) => {
            await page.goto('/verify-email');

            // Should show error for missing token
            await page.waitForSelector('[data-testid="error-status"]', { timeout: 10000 });

            const errorMessage = await page.getByTestId('error-status').textContent();
            expect(errorMessage).toContain('No verification token');
        });
    });

    test.describe('Response Validation Tests', () => {
        test('should validate todo response structure', async ({ page }) => {
            await todoPage.goto();
            await todoPage.addTodo('Structure Test Todo');

            const todos = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('todos') || '[]');
            });

            expect(todos).toHaveLength(1);

            const todo = todos[0];
            expect(todo).toHaveProperty('id');
            expect(todo).toHaveProperty('text');
            expect(todo).toHaveProperty('completed');
            expect(todo).toHaveProperty('createdAt');

            expect(typeof todo.id).toBe('string');
            expect(typeof todo.text).toBe('string');
            expect(typeof todo.completed).toBe('boolean');
            expect(new Date(todo.createdAt)).toBeInstanceOf(Date);
        });
    });

    test.describe('Performance API Tests', () => {
        test('should test API response times', async ({ page }) => {
            await loginPage.goto();

            const startTime = Date.now();
            await loginPage.loginWithValidCredentials();
            await page.waitForURL('/dashboard');
            const endTime = Date.now();

            const loginTime = endTime - startTime;
            expect(loginTime).toBeLessThan(5000); // Should complete within 5 seconds
        });

        test('should test todo operations performance', async ({ page }) => {
            await todoPage.goto();

            // Test adding multiple todos performance
            const startTime = Date.now();

            for (let i = 0; i < 10; i++) {
                await todoPage.addTodo(`Performance Test Todo ${i}`);
            }

            const endTime = Date.now();
            const additionTime = endTime - startTime;

            expect(additionTime).toBeLessThan(3000); // Should add 10 todos within 3 seconds

            // Verify all todos were added
            const todoCount = await todoPage.getTodoItems();
            expect(todoCount).toBe(10);
        });
    });

    test.describe('Error Handling API Tests', () => {
        test('should handle malformed data gracefully', async ({ page }) => {
            await todoPage.goto();

            // Inject malformed data into localStorage
            await page.evaluate(() => {
                localStorage.setItem('todos', 'invalid-json');
            });

            // Reload page to trigger error handling
            await page.reload();

            // Should show empty state instead of crashing
            const isEmptyStateVisible = await todoPage.isEmptyStateVisible();
            expect(isEmptyStateVisible).toBe(true);
        });
    });
});