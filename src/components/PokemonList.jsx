import React, { Component } from 'react'
import PokemonCard from './PokemonCard';
import './PokemonList.css'

export class PokemonList extends Component {
  state = {
    pokemonLink: []
  }

  constructor(props){
    super(props);
    
    this.fetchAllPokemons(30);
  }

  fetchAllPokemons(limit){
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
      {
        'method': 'get',
        'headers': {
          'access-control-allow-origin' : '*',
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(res => {
      res.json().then(pokemon => {
        pokemon.results.forEach(element => this.setState(prevState => ({ pokemonLink: [...prevState.pokemonLink, element.url] })));
      });
    });
  }

  render() { 
    return (
      <>
        <h1>Pokemon List </h1>
        <div className='wrapper'>
        
            {this.state.pokemonLink.map((url, idx) => 
              <PokemonCard url={url} key={idx} />
            )}
        </div>

        
      </>
    )
  }
}

export default PokemonList;