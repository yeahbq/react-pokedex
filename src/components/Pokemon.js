import React from 'react';

class Pokemon extends React.Component {
  state = { character: null };

  componentDidMount() {
    fetch(`https://d1s1rehmg7ei44.cloudfront.net/api/v2/pokemon/${this.props.id}/`)
      .then(res => res.json())
      .then(json => this.setState({ character: json }));
  }

  componentWillReceiveProps(nextProps) {
    fetch(`https://d1s1rehmg7ei44.cloudfront.net/api/v2/pokemon/${nextProps.id}/`)
      .then(res => res.json())
      .then(json => this.setState({ character: json }));
  }

  render() {
    return this.state.character ? (
      <div>
        <h1>{this.state.character.name}</h1>
        <img
          src={this.state.character.sprites.front_default}
          width={96}
          height={96}
        />

        <h2>Abilities</h2>
        <ul>
          {this.state.character.abilities.map(ability => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

export default Pokemon;
