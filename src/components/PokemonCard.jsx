import React, { Component } from 'react'

export class PokemonCard extends Component {

  state = {
    pokemonName: '',
    pokemonThumnail: '',
  }

    constructor(props){
        super(props);

        this.fetchEachPokemon(this.props.url);
    }

    fetchEachPokemon(itemURL){
      fetch(itemURL, {
        'method': 'get',
        'headers': {
          'access-control-allow-origin' : '*',
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(res => {
      
        res.json().then(pokemon => {
          this.setState({
              pokemonName: pokemon.name,
              pokemonThumbnail: pokemon.sprites.front_default
          });
        });
      });
    }

  render() {
    return (
      <>
        <div className='wrapper-item'>
          {this.state.pokemonName} <br />
          <img src={this.state.pokemonThumbnail} width='70px' height='70px' alt={this.state.pokemonName} title={this.state.pokemonName}/>
        </div>
      </>
    )
  }
}

export default PokemonCard