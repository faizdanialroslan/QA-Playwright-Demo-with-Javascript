import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
    readonly todoInput: Locator;
    readonly addTodoButton: Locator;
    readonly todoList: Locator;
    readonly todoItems: Locator;
    readonly todoForm: Locator;
    readonly emptyState: Locator;
    readonly filterAllButton: Locator;
    readonly filterActiveButton: Locator;
    readonly filterCompletedButton: Locator;
    readonly clearCompletedButton: Locator;
    readonly testScenariosSection: Locator;

    constructor(page: Page) {
        super(page, '/todos');
        this.todoInput = page.getByTestId('todo-input');
        this.addTodoButton = page.getByTestId('add-todo-btn');
        this.todoList = page.getByTestId('todo-list');
        this.todoItems = page.locator('[data-testid^="todo-item-"]');
        this.todoForm = page.getByTestId('todo-form');
        this.emptyState = page.getByTestId('empty-state');
        this.filterAllButton = page.getByTestId('filter-all');
        this.filterActiveButton = page.getByTestId('filter-active');
        this.filterCompletedButton = page.getByTestId('filter-completed');
        this.clearCompletedButton = page.getByTestId('clear-completed-btn');
        this.testScenariosSection = page.locator('text=Scenarios Covered:');
    }

    async addTodo(todoText: string) {
        await this.todoInput.fill(todoText);
        await this.addTodoButton.click();
    }

    async addTodoUsingEnter(todoText: string) {
        await this.todoInput.fill(todoText);
        await this.page.keyboard.press('Enter');
    }

    async getTodoItems() {
        return await this.todoItems.count();
    }

    async getTodoText(index: number) {
        const todoItem = this.todoItems.nth(index);
        const textElement = todoItem.locator('[data-testid^="todo-text-"]');
        return await textElement.textContent();
    }

    async completeTodo(index: number) {
        const todoItem = this.todoItems.nth(index);
        const checkbox = todoItem.locator('[data-testid^="todo-checkbox-"]');
        await checkbox.click();
    }

    async deleteTodo(index: number) {
        const todoItem = this.todoItems.nth(index);
        const deleteButton = todoItem.locator('[data-testid^="delete-todo-"]');
        await deleteButton.click();
    }

    async isTodoCompleted(index: number) {
        const todoItem = this.todoItems.nth(index);
        return await todoItem.getAttribute('class').then(cls => cls?.includes('completed') || false);
    }

    async filterTodos(filter: 'all' | 'active' | 'completed') {
        switch (filter) {
            case 'all':
                await this.filterAllButton.click();
                break;
            case 'active':
                await this.filterActiveButton.click();
                break;
            case 'completed':
                await this.filterCompletedButton.click();
                break;
        }
    }

    async clearCompletedTodos() {
        await this.clearCompletedButton.click();
    }

    async isClearCompletedButtonVisible() {
        return await this.clearCompletedButton.isVisible();
    }

    async isEmptyStateVisible() {
        return await this.emptyState.isVisible();
    }

    async getEmptyStateText() {
        return await this.emptyState.textContent();
    }

    async isAddButtonDisabled() {
        return await this.addTodoButton.isDisabled();
    }

    async getFilterButtonText(filter: 'all' | 'active' | 'completed') {
        let button;
        switch (filter) {
            case 'all':
                button = this.filterAllButton;
                break;
            case 'active':
                button = this.filterActiveButton;
                break;
            case 'completed':
                button = this.filterCompletedButton;
                break;
        }
        return await button.textContent();
    }

    async verifyTestScenariosSection() {
        return await this.testScenariosSection.isVisible();
    }

    async addMultipleTodos(todos: string[]) {
        for (const todo of todos) {
            await this.addTodo(todo);
        }
    }

    async getActiveTodoCount() {
        const filterText = await this.filterActiveButton.textContent();
        const match = filterText?.match(/Active \((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }

    async getCompletedTodoCount() {
        const filterText = await this.filterCompletedButton.textContent();
        const match = filterText?.match(/Completed \((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }

    async getTotalTodoCount() {
        const filterText = await this.filterAllButton.textContent();
        const match = filterText?.match(/All \((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }
}
