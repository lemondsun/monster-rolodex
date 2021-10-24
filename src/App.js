import './App.css';
import React,{ Component } from 'react';
import { CardList } from './components/card-list/card-list-component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: 'j',
    };
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  };

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }



  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      )

    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
        placeholder='search monsters'
        handleChange={this.handleChange} 
        />
        
        {//this turnery operator makes sure the monsters are displayed even if they're no monsters in searchField
          this.state.searchField.length > 1 ?
          <CardList monsters={filteredMonsters} />
          :
          <CardList monsters={this.state.monsters} />
      }
      </div>
    );
  };
  
};

export default App;
