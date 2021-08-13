import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <h1 className="child">React TODO App</h1>
        <Todos />
        <div className="child">
          <span>Total of items: 0</span> | <span>Completed: 0</span>
        </div>
      </div>
    );
  }
}

class Todos extends Component {

  //Component state with default values
  state = {
    addTodoDescription: "",
    todos: [
      {
        id: 1,
        description: "Lorem ipsum dolor sit amet",
        completed: false
      },
      {
        id: 2,
        description: "consectetur adipiscing elit",
        completed: true
      },
      {
        id: 3,
        description: "tsed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        completed: false
      }
    ]
  }

  render() {
    return (
      <div className="child">
        <table className="table">
          <thead>
            <tr>
              <td></td>
              <td>What to do next</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo, index) => (
              <tr key={todo.id}>
                <Todo index={index + 1} todo={todo} />
              </tr>
            ))}
            <tr>
              <td colSpan="3">
                <AddTodo addTodoDescription={this.state.addTodoDescription} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class Todo extends Component {

  render() {
    return (
      <React.Fragment >
        <td style={{ width: 15 }}>
          <input type="checkbox" />
        </td>
        <td>
          {
            this.renderTodo()
          }
        </td>
        <td style={{ width: 100 }}>
          <button>Delete</button>
        </td>
      </React.Fragment>
    );
  }

  renderTodo() {
    if (this.props.todo.completed)
      return <s>{this.props.todo.description}</s>;
    else
      return this.props.todo.description;
  }
}

class AddTodo extends Component {
  state = {
    defaultValue: "",
    description: this.props.addTodoDescription
  }

  render() {
    return (
      <div className="child">
        <input type="text" id="todoDescription" placeholder="Todo description" />
        <div>
          <button type="button" id="buttonAddTodo">Add Todo</button>
        </div>
      </div>
    );
  }
}

export default App;
