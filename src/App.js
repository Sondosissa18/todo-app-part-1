import React, { Component } from "react";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList,
  };
  // this.handleTodoChange = this.handleTodoChange.bind(this)

  handleDeleteTodo = (event, todoId) => {
    console.log("click", todoId);
    const todosRemove = this.state.todos.filter((todo) => {
      if (todo.id === todoId) {
        return false;
      }
      return true;
    });
    this.setState({
      todos: todosRemove,
    });
  };
  handleClearTodos = () => {
    const todosCleared = this.state.todos.filter((todo) => !todo.completed);
    this.setState({
      todos: todosCleared,
    });
  };
  //clearcomponent
  handleChecked = (todoId) => {
    console.log(todoId);
    console.log(this.state.todos);
    let newtodo = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({
      ...this.state,
      todos: newtodo,
    });
  };

  SubmitTodohandle = (event) => {
    if (event.key === "Enter") {
      let newtodos = [...this.state.todos];
      event.preventDefault();
      let newtodo = {
        userId: 1,
        id: Math.floor(Math.random() * 100),
        title: event.target.value,
        completed: false,
      };
      newtodos.push(newtodo);
      this.setState({
        todos: newtodos,
      });
      // this.props.todos(this.state);
    }
  };

  render() {
    console.log(this.state.todos);
    return (
      <section className="todoapp ">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            type="text"
            onKeyDown={this.SubmitTodohandle}
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <TodoList
          todos={this.state.todos}
          handleDeleteTodo={this.handleDeleteTodo}
          toggleCompleted={this.handleChecked}
        />

        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>

          <button className="clear-completed" onClick={this.handleClearTodos}>
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  // completeChange = () => {};

  // handleTodoChange = (event) => {
  //   this.setState({
  //     title: event.target.value,
  //   });
  // };

  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={this.props.toggleCompleted}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={(event) => this.props.handleDeleteTodo(event, this.props.id)} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  // if(todo.completed === true ? () : null
  // let todosList = todos.length ? () : null;
  render() {
    console.log(this.props);
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map((todo) => (
            <TodoItem
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              toggleCompleted={(event) => this.props.toggleCompleted(todo.id)}
              handleDeleteTodo={this.props.handleDeleteTodo}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
