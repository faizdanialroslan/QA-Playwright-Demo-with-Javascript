<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# QA Playwright Test Automation Portfolio - Copilot Instructions

This is a comprehensive test automation portfolio demonstrating advanced Playwright testing capabilities with React applications.

## Project Context
- **Frontend**: React 18 + TypeScript + Vite
- **Testing**: Playwright with Page Object Model architecture
- **Integration**: Email verification with Mailinator API
- **CI/CD**: GitHub Actions with MCP server integration
- **Authentication**: JWT-based authentication with session management

## Code Patterns and Conventions

### Page Object Model
When creating or modifying page objects:
- Extend from `BasePage` class
- Use `data-testid` attributes for element selection
- Group related actions into methods
- Return meaningful values for assertions
- Use async/await for all Playwright operations

Example:
```typescript
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  
  constructor(page: Page) {
    super(page, '/login');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
  }
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Test Structure
- Use descriptive test names that explain the behavior being tested
- Group related tests using `test.describe()`
- Use `test.beforeEach()` for common setup
- Include both positive and negative test scenarios
- Add performance and error handling tests

Example:
```typescript
test.describe('Authentication Flows', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });
  
  test('should login with valid credentials and redirect to dashboard', async ({ page }) => {
    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### React Components
- Use functional components with TypeScript
- Implement proper TypeScript interfaces
- Add `data-testid` attributes for testing
- Use proper error boundaries and loading states
- Follow React hooks patterns

Example:
```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li data-testid={`todo-item-${todo.id}`} className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <span data-testid={`todo-text-${todo.id}`}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} data-testid={`delete-todo-${todo.id}`}>
        Delete
      </button>
    </li>
  );
};
```

## Testing Guidelines

### Selectors
- Prefer `data-testid` attributes over CSS selectors
- Use `page.getByTestId()` for test-specific elements
- Use `page.getByRole()` for semantic elements
- Avoid using fragile CSS selectors or XPath

### Assertions
- Use Playwright's built-in assertions (`expect()`)
- Wait for elements with proper timeouts
- Test both UI state and underlying data
- Include edge cases and error scenarios

### API Testing
- Test both successful and error responses
- Validate response structure and data types
- Include performance benchmarks
- Test authentication and authorization

### Email Testing
- Use Mailinator API for email verification flows
- Parse both text and HTML email content
- Extract verification links using regex patterns
- Test email delivery timing and reliability

## Best Practices

### Error Handling
- Always handle async operations properly
- Use try-catch blocks for API calls
- Provide meaningful error messages
- Test error scenarios comprehensively

### Performance
- Set appropriate timeouts for operations
- Use parallel execution where possible
- Monitor test execution times
- Optimize selectors and waits

### Maintainability
- Keep tests independent and isolated
- Use constants for repeated values
- Create helper functions for common operations
- Update tests when UI changes

### Security
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Test authentication and authorization flows
- Validate input sanitization

## Specific Project Features

### Authentication System
- Mock JWT-based authentication
- Session management with cookies
- Protected routes and redirects
- User registration with email verification

### Todo Application
- CRUD operations with localStorage
- Real-time filtering and counting
- Persistent data across sessions
- Responsive design for mobile

### Email Verification
- Integration with Mailinator API
- Email parsing and link extraction
- Token-based verification flow
- Error handling for invalid tokens

### MCP Server Integration
- Distributed test execution
- Cross-browser test sharding
- Performance monitoring
- Artifact collection and reporting

When working on this project, prioritize:
1. Comprehensive test coverage
2. Maintainable Page Object Model architecture
3. Robust error handling
4. Performance optimization
5. Clear documentation and examples

Always ensure tests are reliable, fast, and provide clear failure information when issues occur.
