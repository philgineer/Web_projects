import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import "./App.css";
import { v4 as uuid } from "uuid";
import Axios from "axios";

class App extends Component {
  state = {
    todos: [
      {
        id: uuid(),
        title: "Meeting with client at noon",
        completed: false,
      },
      {
        id: uuid(),
        title: "고슴도치 밥 주기",
        completed: false,
      },
      {
        id: uuid(),
        title: "You can check the thing you've done",
        completed: true,
      },
    ],
  };

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed; // toggle
        }
        return todo;
      }),
    });
  };

  // Delete Todo
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
      (res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id != id)],
        })
    );

    // this.setState({
    //   todos: [...this.state.todos.filter((todo) => todo.id != id)],
    // });
  };

  // Add Todo
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid(),
    //   title, // title: title,
    //   completed: false,
    // };
    Axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false,
    }).then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
    // this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
