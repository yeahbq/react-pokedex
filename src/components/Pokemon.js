import React from 'react';

class Pokemon extends React.Component {
  state = { character: null };

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
      <div>
        <h1>{this.state.character.name}</h1>
        <img src={this.state.character.sprites.front_default} width={96} height={96} />
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

export default Pokemon;
