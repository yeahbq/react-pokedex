import React, { Component } from 'react';
import './App.css';
import './Pokemon-Types.css';
import missingno from './assets/missingno.png'

// poke api js wrapper throws error when trying to precompile
// var Pokedex = values;
// var options = {
//   protocol: 'https',
//   // hostName: 'localhost:443',
//   versionPath: '/api/v2/',
//   cache: true,
//   timeout: 5 * 1000 // 5s
// }
// var P = new Pokedex.Pokedex(options);
// var P = new Pokedex.Pokedex();

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

    <div className="pokemon-header section">
      <div className="pokemon-pokedex">
        <div className="pokemon-border">
        
          <div className="pokemon-content">

          { props.character.sprites ?
          <div style={ {display:"flex", flexDirection:"column", alignItems:"baseline", justifyContent:"flex-start"} }>
            <img className="pokeImg" 
              src={props.character.sprites.front_default}
              alt={"Poke-image not found"}/> 
            <p className="poke-num">No.{props.character.id}</p>

            { props.character.types ? 
              <div className="typing section">
                <div className="typing-content">
                  <h2 style={{width:"100%"}}>Type</h2>
                  {props.character.types.map(element=> (
                  <div className={`${element.type.name}-type all-types`} >{element.type.name + " "} </div>
                ))}
                </div>
              </div> :
              ""
              }
            </div>
            :
            <img className="pokeImg" 
            src={missingno}
            alt={"Poke-image not found"}/>
          }

          { props.character.id ?
            <div className="poke-vitals">
              <div>
              <p className="poke-name">{props.character.name}</p> 
              <p className="poke-height">HT {props.character.height / 10}m</p>
              <p className="poke-weight">WT {props.character.weight / 10}kg</p>
            </div>
              
              { props.character.abilities ?
                <div className="abilities section">
                  <h2>Abilities</h2>
                  <ol>
                    {props.character.abilities.map(ability => (
                      <li key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                  </ol>
                </div> :
                  ""
                }
              
            </div> :
          <div className="poke-vitals">
            <div>
              <p className="poke-name">MissingNo.</p> 
              <p className="poke-height">HT ???m</p>
              <p className="poke-weight">WT ???kg</p>
            </div>
            `??? Pokémon Not Found! Please try another Pokemon name or number between 1-802`
          </div>
   
          }
          
          </div>
        </div>
      </div>
    </div>

      {/* { props.character.types ? 
      <div className="typing section">
        <div className="typing-content">
          <h2 style={{width:"100%"}}>Type</h2>
          {props.character.types.map(element=> (
          <div className={`${element.type.name}-type all-types`} >{element.type.name + " "} </div>
        ))}
        </div>
      </div> :
      ""
      }

    { props.character.abilities ?
    <div className="abilities section">
      <h2>Abilities</h2>
      <ol>
        {props.character.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ol>
    </div> :
      ""
    } */}
    

    {/* { props.character.moves ?
    <div className="moves section">
      <h2>Moves</h2>
      <ul style={ {padding:"0"} } className="moves-list">
        {props.character.moves.map(move => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
    </div> :
     ""
    } */}

    { props.character.stats ? 
    <div className="stats section">
      <h2>Stats</h2>
      <ul style={ {padding:"0"} }>
        {props.character.stats.map(stat => (
          
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat} <div className="stat_bar" style={{width:`${stat.base_stat}.px`, background:"black"}}> | </div></li>
        ))}
      </ul>
    </div> :
     ""
    }
  </div> 


class Pager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index:"pikachu",
      value:'',
      character: this.props.character,
      id:""

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
            Next {this.props.character}
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

          {/* <button type="button"
            onClick={() =>
              P.getBerryByName('cheri')
              .then(function(response) {
                console.log(response);
              })
            }
          >
              TEST THIS!
            </button> */}
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="search" placeholder="Search Pokemon" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        {this.props.render(this.state.index)}
      </div>
    );
  }
}



const ShowId = props => <h1>{props.id}</h1>

class App extends Component {
  constructor() {
    super();

    // Get Initial State
    this.state = {
      character: null,
      id: 26,
    }
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
