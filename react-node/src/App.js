import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {
      name: "Jane Porter",
      bio: "real Tarzan's wife"
      // created_at: Date.now().toString(),
      // updated_at: Date.now().toString(),
      // id: Math.random
    }
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then(res => res.json())
      // .then(res => {
      //   console.log(res);
      // })
      .then(res => this.setState({ users: res }));
    // .catch(err => console.error(err))
  };

  // addUser = (e, anotherUser) => {
  //   // const { user } = this.state;
  //   fetch(`http://localhost:4000/api/users`, anotherUser)
  //   // .then(res => res.json())
  //   .then(this.getUsers)
  //   .catch(err => console.error(err))
  // };
  // addUser = (e, anotherUser) => {
  //   fetch(`http://localhost:4000/api/users`, anotherUser)
  //   // .then(res => res.json())
  //   .then(res => {
  //     this.setState({users: res})
  //   })
  //   .catch(err => console.error(err))
  // };

  renderUser = ({ id, name, bio }) => (
    <div key={id}>
      {name} , {bio}
    </div>
  );
  render() {
    const { users, user } = this.state;
    return (
      <div className="App">
        {users.map(this.renderUser)}

        <div>
          <input
            value={user.name}
            onChange={e =>
              this.setState({ user: { ...user, name: e.target.value } })
            }
          />
          <input
            value={user.bio}
            onChange={e =>
              this.setState({ user: { ...user, bio: e.target.value } })
            }
          />
          {/* <input
            value={user.created_at}
           />
           <input
            value={user.updated_at}
           /> */}
          {/* <button onClick={this.addUser}>Add user</button> */}
        </div>
      </div>
    );
  }
}

export default App;
