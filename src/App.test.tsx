import { getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { ITodo } from './model/todo';

/**
 * I have covered all business scenarios under this test setup
 * in more details we can test all individual components, utilities, services etc
 * but this kind of integration testing covers all modules
 * 
 * I would like to add few test cases for each module by mocking the other dependencies
 * but for the moment this test case covers all possible scenarios
 */
describe('Check App Component', () => {
  test('when App renders first time then there should not be any TODO', async () => {
    render(<App />);
    // Default render
    screen.getByText(/React TODO App/i);
    screen.getByText(/What to do next/i);
    screen.getByText(/TODOs not Found/i);
    const todoTextField = screen.getByTestId('todoTextField');
    const addTodoButton = screen.getByTestId('addTodoButton');
    // Trying to add a invalid TODO
    await waitFor(() => {
      userEvent.type(todoTextField, '');
      userEvent.click(addTodoButton);
    });
    // UI does not excepts the invalid TODO and it shows repective message
    screen.getByText(/Invalid TODO/i);
    screen.getByText(/TODOs not Found/i);
  });


  test('when we run the whole flow then UI and state should update accordingly', async () => {
    render(<App />);
    const todoTextField = screen.getByTestId('todoTextField');
    const addTodoButton = screen.getByTestId('addTodoButton');
    // [FIRST_TODO]
    const firstTodoDesc = 'This is my first TODO';
    await waitFor(() => {
      userEvent.type(todoTextField, firstTodoDesc);
      userEvent.click(addTodoButton);
    });
    // TODO added message shown
    screen.getByText(/TODO added/i);

    // After adding first TODO> All: 1, Pending: 1
    const allToggleBtn = screen.getByTestId('filterAllToggleBtn');
    const doneToggleBtn = screen.getByTestId('filterDoneToggleBtn');
    const pendingToggleBtn = screen.getByTestId('filterPendingToggleBtn');
    getByText(allToggleBtn, /1/);
    getByText(pendingToggleBtn, /1/);

    // Checking Todo text in DOM
    screen.getByText(firstTodoDesc);

    // Checking localStorage
    let storageValue = JSON.parse(localStorage.getItem('TODOS_LOCAL_STATE') || '[]') as ITodo[];
    expect(storageValue.length).toBe(1);
    expect(storageValue[0].description).toBe(firstTodoDesc);
    expect(storageValue[0].completed).toBe(false);

    // Trying again with existing TODO again, it should not add it
    await waitFor(() => {
      userEvent.type(todoTextField, firstTodoDesc);
      userEvent.click(addTodoButton);
    });
    // TODO already existing message shown
    screen.getByText(/Todo "This is my first TODO" already exists!/i);

    // cheking localStorage in this existing case, it should remain unchanged
    storageValue = JSON.parse(localStorage.getItem('TODOS_LOCAL_STATE') || '[]') as ITodo[];
    expect(storageValue.length).toBe(1);

    // [SECOND_TODO]
    const secondTodoDesc = 'This is my second TODO';
    await waitFor(() => {
      userEvent.type(todoTextField, secondTodoDesc);
      userEvent.click(addTodoButton);
    });
    // After adding second TODO > All: 2, Pending: 2
    getByText(allToggleBtn, /2/);
    getByText(pendingToggleBtn, /2/);

    // Checking Todo text in DOM with default style
    const secondTodoDescParagraph = screen.getByText(secondTodoDesc);
    expect(secondTodoDescParagraph).toHaveStyle({
      textDecoration: 'none'
    });

    // Checking localStorage state update
    storageValue = JSON.parse(localStorage.getItem('TODOS_LOCAL_STATE') || '[]') as ITodo[];
    expect(storageValue.length).toBe(2);
    expect(storageValue[1].description).toBe(secondTodoDesc);
    expect(storageValue[1].completed).toBe(false);

    // Completing the second task
    let checkboxes = screen.getAllByRole('checkbox');
    const secondTodoToggle = checkboxes[1];
    await waitFor(() => {
      userEvent.click(secondTodoToggle);
    });

    // Now style should be updated as completed TODO
    expect(secondTodoDescParagraph).toHaveStyle({
      textDecoration: 'line-through'
    });

    // After completing second TODO All: 2, Pending: 1, Done: 1,
    getByText(allToggleBtn, /2/);
    getByText(doneToggleBtn, /1/);
    getByText(pendingToggleBtn, /1/);

    // Filter only Done TODOs
    await waitFor(() => {
      userEvent.click(doneToggleBtn);
    });
    // only Done shown on UI, now only 1 Done TODO is being shown in UI
    checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(1);

    // Filter: All TODOs
    await waitFor(() => {
      userEvent.click(allToggleBtn);
    });
    // all TODOs shown on UI 
    checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);

    // Deleting TODOs > Deleting Both
    const deleteBtns = screen.getAllByLabelText('Delete Todo');
    await waitFor(() => {
      userEvent.click(deleteBtns[0]); // First TODO deleted
      userEvent.click(deleteBtns[1]); // Second TODO deleted
    });

    // no TODOs shown on UI 
    checkboxes = await screen.queryAllByRole('checkbox');
    expect(checkboxes.length).toBe(0);

    // Error message shown on UI if all TODOs deleted
    screen.getByText(/TODOs not Found/i);

    // localStorage should also reflect the empty TODO list
    const localState = localStorage.getItem('TODOS_LOCAL_STATE');
    expect(localState).toBe('[]');

    // Journey Completed
  });
});