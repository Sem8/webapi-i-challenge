import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    users: [],
    name: 'Jane Porter',
    bio: 'real Tarzan\'s wife',
    created_at: Date.now().toString(),
    updated_at: Date.now().toString()
  };

  componentDidMount() {
    this.getUsers();
    
  };

  getUsers = () => {
    fetch('http://localhost:4000/api/users', )
    .then(res => res.json())    
    // .then(res => {
    //   console.log(res);
    // })
    .then(res => this.setState({ users: res }))
    // .catch(err => console.error(err))
  };

  addUser = () => {

  }


  renderUser = ({ id, name, bio }) => <div key={id}>{name} , {bio}</div>
  render() {
    const { users, user } = this.state;
    return (
      <div className="App">
        {users.map(this.renderUser)}

        <div>
          <input
            value={user.name}
           />
           <input
            value={user.bio}
           />
           <input
            value={user.created_at}
           />
           <input
            value={user.updated_at}
           />
        </div>
        
      </div>
    );
  }
}

export default App;
