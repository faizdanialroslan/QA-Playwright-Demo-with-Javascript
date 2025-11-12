import { test, expect, Page } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo Application - Basic UI Tests', () => {
    let homePage: HomePage;
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        todoPage = new TodoPage(page);
        await homePage.goto();
    });

    test('should navigate to todo app from home page', async ({ page }) => {
        await homePage.navigateToTodos();
        await expect(page).toHaveURL('/todos');
        await expect(todoPage.todoForm).toBeVisible();
    });

    test('should display empty state when no todos exist', async ({ page }) => {
        await todoPage.goto();

        // Clear any existing todos from localStorage
        await page.evaluate(() => {
            localStorage.removeItem('todos');
            window.location.reload();
        });

        await expect(todoPage.emptyState).toBeVisible();
        const emptyText = await todoPage.getEmptyStateText();
        expect(emptyText).toContain('No todos yet');
    });

    test('should add a new todo item', async ({ page }) => {
        await todoPage.goto();

        // Clear existing todos
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        const todoText = 'Complete Playwright testing assignment';
        await todoPage.addTodo(todoText);

        // Verify todo was added
        const todoCount = await todoPage.getTodoItems();
        expect(todoCount).toBe(1);

        const addedTodoText = await todoPage.getTodoText(0);
        expect(addedTodoText).toBe(todoText);
    });

    test('should add multiple todo items', async ({ page }) => {
        await todoPage.goto();

        // Clear existing todos
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        const todos = [
            'Write comprehensive test cases',
            'Implement Page Object Model',
            'Set up CI/CD pipeline',
            'Document test results'
        ];

        await todoPage.addMultipleTodos(todos);

        // Verify all todos were added
        const todoCount = await todoPage.getTodoItems();
        expect(todoCount).toBe(todos.length);

        // Verify todo texts
        for (let i = 0; i < todos.length; i++) {
            const todoText = await todoPage.getTodoText(i);
            expect(todoText).toBe(todos[i]);
        }
    });

    test('should mark a todo item as complete', async ({ page }) => {
        await todoPage.goto();

        // Clear and add a test todo
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        const todoText = 'Test todo completion';
        await todoPage.addTodo(todoText);

        // Mark as complete
        await todoPage.completeTodo(0);

        // Verify todo is completed
        const isCompleted = await todoPage.isTodoCompleted(0);
        expect(isCompleted).toBe(true);

        // Verify counters updated
        const completedCount = await todoPage.getCompletedTodoCount();
        const activeCount = await todoPage.getActiveTodoCount();
        expect(completedCount).toBe(1);
        expect(activeCount).toBe(0);
    });

    test('should unmark a completed todo', async ({ page }) => {
        await todoPage.goto();

        // Setup
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        await todoPage.addTodo('Test todo unmarking');
        await todoPage.completeTodo(0);

        // Unmark by clicking checkbox again
        await todoPage.completeTodo(0);

        // Verify todo is not completed
        const isCompleted = await todoPage.isTodoCompleted(0);
        expect(isCompleted).toBe(false);

        const activeCount = await todoPage.getActiveTodoCount();
        const completedCount = await todoPage.getCompletedTodoCount();
        expect(activeCount).toBe(1);
        expect(completedCount).toBe(0);
    });

    test('should delete a todo item', async ({ page }) => {
        await todoPage.goto();

        // Setup
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        await todoPage.addTodo('Todo to be deleted');
        await todoPage.addTodo('Todo to keep');

        let todoCount = await todoPage.getTodoItems();
        expect(todoCount).toBe(2);

        // Delete first todo
        await todoPage.deleteTodo(0);

        // Verify deletion
        todoCount = await todoPage.getTodoItems();
        expect(todoCount).toBe(1);

        const remainingTodoText = await todoPage.getTodoText(0);
        expect(remainingTodoText).toBe('Todo to keep');
    });

    test('should filter todos by status', async ({ page }) => {
        await todoPage.goto();

        // Setup todos with different states
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        await todoPage.addTodo('Active todo 1');
        await todoPage.addTodo('Active todo 2');
        await todoPage.addTodo('To be completed');

        // Complete one todo
        await todoPage.completeTodo(2);

        // Test All filter
        await todoPage.filterTodos('all');
        let visibleTodos = await todoPage.getTodoItems();
        expect(visibleTodos).toBe(3);

        // Test Active filter
        await todoPage.filterTodos('active');
        visibleTodos = await todoPage.getTodoItems();
        expect(visibleTodos).toBe(2);

        // Test Completed filter
        await todoPage.filterTodos('completed');
        visibleTodos = await todoPage.getTodoItems();
        expect(visibleTodos).toBe(1);
    });

    test('should clear completed todos', async ({ page }) => {
        await todoPage.goto();

        // Setup
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        await todoPage.addTodo('Active todo');
        await todoPage.addTodo('Completed todo 1');
        await todoPage.addTodo('Completed todo 2');

        // Complete some todos
        await todoPage.completeTodo(1);
        await todoPage.completeTodo(2);

        // Verify clear completed button is visible
        const isClearButtonVisible = await todoPage.isClearCompletedButtonVisible();
        expect(isClearButtonVisible).toBe(true);

        // Clear completed
        await todoPage.clearCompletedTodos();

        // Verify only active todos remain
        const remainingTodos = await todoPage.getTodoItems();
        expect(remainingTodos).toBe(1);

        const remainingTodoText = await todoPage.getTodoText(0);
        expect(remainingTodoText).toBe('Active todo');
    });

    test('should persist todos in localStorage', async ({ page }) => {
        await todoPage.goto();

        // Clear and add todos
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        const testTodos = ['Persistent todo 1', 'Persistent todo 2'];
        await todoPage.addMultipleTodos(testTodos);

        // Complete one todo
        await todoPage.completeTodo(0);

        // Reload page and wait for todos to load
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500); // Give React time to load from localStorage

        // Verify todos persisted
        const todoCount = await todoPage.getTodoItems();
        expect(todoCount).toBe(2);

        // Verify completion state persisted
        const isFirstCompleted = await todoPage.isTodoCompleted(0);
        expect(isFirstCompleted).toBe(true);
    });

    test('should disable add button when input is empty', async ({ page }) => {
        await todoPage.goto();

        // Check initial state
        const isDisabled = await todoPage.isAddButtonDisabled();
        expect(isDisabled).toBe(true);

        // Type in input
        await todoPage.todoInput.fill('New todo');
        const isEnabledAfterTyping = await todoPage.isAddButtonDisabled();
        expect(isEnabledAfterTyping).toBe(false);

        // Clear input
        await todoPage.todoInput.fill('');
        const isDisabledAfterClearing = await todoPage.isAddButtonDisabled();
        expect(isDisabledAfterClearing).toBe(true);
    });

    test('should show correct todo counts in filter buttons', async ({ page }) => {
        await todoPage.goto();

        // Setup
        await page.evaluate(() => localStorage.removeItem('todos'));
        await page.reload();

        // Add todos and complete some
        await todoPage.addTodo('Active 1');
        await todoPage.addTodo('Active 2');
        await todoPage.addTodo('To complete 1');
        await todoPage.addTodo('To complete 2');

        await todoPage.completeTodo(2);
        await todoPage.completeTodo(3);

        // Check counts
        const totalCount = await todoPage.getTotalTodoCount();
        const activeCount = await todoPage.getActiveTodoCount();
        const completedCount = await todoPage.getCompletedTodoCount();

        expect(totalCount).toBe(4);
        expect(activeCount).toBe(2);
        expect(completedCount).toBe(2);
    });

    test('should display test scenarios documentation', async ({ page }) => {
        await todoPage.goto();

        const isTestScenariosVisible = await todoPage.verifyTestScenariosSection();
        expect(isTestScenariosVisible).toBe(true);
    });
});
