import React, { Component } from 'react';
import './App.css';
// import Pokemon from './components/Pokemon'
// import PokemonPager from './components/PokemonPager'

class FetchPokemon extends React.Component {
  state = { 
          character: null,
          id: '',
          };

  setCharacter = id =>
    fetch(`https://d1s1rehmg7ei44.cloudfront.net/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(json => this.setState({ character: json }));


  
  componentDidMount() {
    this.setCharacter(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setCharacter(nextProps.id)
  }

  render() {
    return this.state.character ? (
      this.props.render(this.state.character)
    ) : (
      <div>loading...</div>
    );
  }
}

const Pokemon = props =>
  <div>
    <h1>{props.character.name}</h1>
    <img className="pokeImg"
      src={props.character.sprites.front_default}
      width={96}
      height={96}
    />

    <h2>Abilities</h2>
    <ul>
      {props.character.abilities.map(ability => (
        <li key={ability.ability.name}>{ability.ability.name}</li>
      ))}
    </ul>
    <h2>Stats</h2>
    <ul>
      {props.character.stats.map(stat => (
        
        <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat} <div className="stat_bar" style={{width:`${stat.base_stat}.px`, background:"black"}}> | </div></li>
      ))}
    </ul>
  </div>

  class Guesser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value:''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('A Pokemon was submitted: ' + this.state.value);
      event.preventDefault();
      this.setState({index:this.state.value})
    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="search" placeholder="Search Pokemon" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      )
    }
  }


class Pager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index:"pikachu",
      value:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A Pokemon was submitted: ' + this.state.value);
    event.preventDefault();
    this.setState({index:this.state.value})
  }

  getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

   componentDidMount() {
    this.setState({index: this.getRandom(1,151)})
  }
  
  render() {
    return (
      <div>
        {this.props.render(this.state.index)}

        <button
          type="button"
          onClick={() =>
            this.setState(({ index }) => ({
              index: index - 1
            }))}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() =>
            this.setState(({ index }) => ({
              index: index + 1
            }))}
        >
          Next
        </button>

        <button
          type="button"
          onClick={() =>
            this.setState(({ index }) => ({
              index: this.getRandom(1,151)
            }))}
        >
          RANDOM
        </button>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" placeholder="Search Pokemon" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

const ShowId = props => <h1>{props.id}</h1>

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pager
          render={id =>
            <FetchPokemon
              id={id}
              render={character =>
                <Pokemon character={character} />
                
              }
            />
          }
        />
      </div>
    );
  }
}

export default App;
