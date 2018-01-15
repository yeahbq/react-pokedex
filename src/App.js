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
      .catch(error => {
        console.error('Error:', error)
        return;
      })
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
  <div className="poke-info">
    <div className="pokemon-header">
      <h1>{props.character.name}</h1>
      { props.character.sprites ?
      <img className="pokeImg" 
        src={props.character.sprites.front_default}
        width={96}
        height={96}
        alt={"Pokemon not found"}/> :
       <div> "Sorry"</div>
      }
    </div>

    { props.character.abilities ?
    <div className="abilities">
      <h2>Abilities</h2>
      <ol>
        {props.character.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ol>
    </div> :
      ""
    }
    
    { props.character.moves ?
    <div className="moves">
      <h2>Moves</h2>
      <ul style={ {padding:"0"} } className="moves-list">
        {props.character.moves.map(move => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
    </div> :
     ""
    }

    { props.character.stats ? 
    <div className="stats">
      <h2>Stats</h2>
      <ul style={ {padding:"0"} }>
        {props.character.stats.map(stat => (
          
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat} <div className="stat_bar" style={{width:`${stat.base_stat}.px`, background:"black"}}> | </div></li>
        ))}
      </ul>
    </div> :
     "Pokemon Not Found! Please try another Pokemon name or number between 1-802"
    }
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
    event.preventDefault();
    this.setState({index:this.state.value})
  }

  getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
 // This loaded in a random pokemon once page loaded, but pikachu always flashes
  //  componentDidMount() {
  //   this.setState({index: this.getRandom(1,151)})
  // }
  
  render() {
    return (
      <div className="main">
        {this.props.render(this.state.index)}
        <div className="search-component">
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
                index: this.getRandom(1,802)
              }))}
          >
            RANDOM
          </button>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="search" placeholder="Search Pokemon" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
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