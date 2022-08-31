import React, { Component } from 'react'
import './PokemonList.css'

export class PokemonList extends Component {
  state = {
    pokemons: []
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
        pokemon.results.forEach(element => this.fetchEachPokemon(element.url));
      });
    });
  }

  fetchEachPokemon(item){
    fetch(item, {
      'method': 'get',
      'headers': {
        'access-control-allow-origin' : '*',
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => {
    
      res.json().then(pokemon => {
        this.setState(prevState => ({
          pokemons: [...prevState.pokemons, {
            name:pokemon.name,
            thumbnail: pokemon.sprites.front_default
          }]
        }));
      });
    });
  }

  render() {
    return (
      <>
        <h1>Pokemon List </h1>
        <div className='wrapper'>
   
            {this.state.pokemons.map((pokemon, idx) => 
              <div className='wrapper-item' key={idx}>
                {pokemon.name} <br />
                <img src={pokemon.thumbnail} width='70px' height='70px' alt={pokemon.name} title={pokemon.name}/>
              </div>
            )}
 
        </div>

        
      </>
    )
  }
}

export default PokemonList;