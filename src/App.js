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
            <div style={ {display:"flex", flexDirection:"column", alignItems:"baseline", justifyContent:"flex-start"} }>
              <img className="pokeImg" 
              src={missingno}
              alt={"Poke-image not found"}/>
              <p className="poke-num">No.???</p>

              <div className="typing section">
                <div className="typing-content">
                  <h2 style={{width:"100%"}}>Type</h2>
                  ???
                </div>
              </div>
            </div>
            
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
    this.setState({index:this.state.value.toLowerCase()})
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
            <div className="search-div" style={{display:"flex"}}>
              <input className="poke-form" type="text" name="search" placeholder="Search Pokemon" value={this.state.value} onChange={this.handleChange}/>
              <div onClick={this.handleSubmit} class="_1miobth"><svg viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" style={{height:"24px", width:"24px", display:"block", fill:"#767676", marginRight:"11px"}}><path d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1" fill-rule="evenodd"></path></svg></div>
              <input type="submit" value="Submit" style={{display:"none"}}/>
            </div>
          </form>
        </div>
        {this.props.render(this.state.index)}
      </div>
    );
  }
}



const ShowId = props => <h1>{props.id}</h1>

const Header = () => 
<div className="header">
  <div className="header-background">
    <h1>React Pokedex</h1>
  </div>
</div>

const Footer = () => 
<div className="footer">
  <p>Pokemon Pokedex made with React, using PokeApi</p>
  <p>Barrett Quan 2018</p>
</div>

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
        <Header/>
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
        <Footer/>
      </div>
    );
  }
}

export default App;
