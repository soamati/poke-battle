import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type InventoryItem = {
  item: Item;
  units: Scalars['Int'];
};

export type Item = {
  id: Scalars['Float'];
  mode: Scalars['String'];
  name: Scalars['String'];
  stat: Stat;
  value: Scalars['Float'];
};

export type ItemStore = {
  item: Item;
  price: Scalars['Float'];
};

export type Mutation = {
  buyItem: Item;
  buyPokemon: Pokemon;
  signin: User;
  signout: Scalars['Boolean'];
  signup: User;
};


export type MutationBuyItemArgs = {
  id: Scalars['Float'];
};


export type MutationBuyPokemonArgs = {
  id: Scalars['Float'];
};


export type MutationSigninArgs = {
  data: UserInput;
};


export type MutationSignupArgs = {
  data: UserInput;
};

export type PokedexItem = {
  luck: Scalars['Float'];
  pokemon: Pokemon;
};

export type Pokemon = {
  attack: Scalars['Float'];
  defense: Scalars['Float'];
  health: Scalars['Float'];
  id: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type PokemonStore = {
  isOwned: Scalars['Boolean'];
  pokemon: Pokemon;
  price: Scalars['Float'];
};

export type Query = {
  inventory: Array<InventoryItem>;
  itemStore: Array<ItemStore>;
  pokedex: Array<PokedexItem>;
  pokemonStore: Array<PokemonStore>;
  pokemons: Array<Pokemon>;
  whoami?: Maybe<User>;
};


export type QueryItemStoreArgs = {
  skip?: InputMaybe<Scalars['Float']>;
};


export type QueryPokedexArgs = {
  id?: InputMaybe<Scalars['Float']>;
};


export type QueryPokemonStoreArgs = {
  skip?: InputMaybe<Scalars['Int']>;
};

export type Stat = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type User = {
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type PokemonsQueryVariables = Exact<{ [key: string]: never; }>;


export type PokemonsQuery = { pokemons: Array<{ id: number, name: string }> };

export type PokemonStoreQueryVariables = Exact<{
  skip: Scalars['Int'];
}>;


export type PokemonStoreQuery = { pokemonStore: Array<{ price: number, isOwned: boolean, pokemon: { id: number, name: string, attack: number, defense: number, health: number, image: string } }> };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { whoami?: { id: number, username: string } | null };

export type SigninMutationVariables = Exact<{
  data: UserInput;
}>;


export type SigninMutation = { signin: { id: number, username: string } };


export const PokemonsDocument = `
    query Pokemons {
  pokemons {
    id
    name
  }
}
    `;
export const usePokemonsQuery = <
      TData = PokemonsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PokemonsQueryVariables,
      options?: UseQueryOptions<PokemonsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PokemonsQuery, TError, TData>(
      variables === undefined ? ['Pokemons'] : ['Pokemons', variables],
      fetcher<PokemonsQuery, PokemonsQueryVariables>(client, PokemonsDocument, variables, headers),
      options
    );
export const useInfinitePokemonsQuery = <
      TData = PokemonsQuery,
      TError = unknown
    >(
      _pageParamKey: keyof PokemonsQueryVariables,
      client: GraphQLClient,
      variables?: PokemonsQueryVariables,
      options?: UseInfiniteQueryOptions<PokemonsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<PokemonsQuery, TError, TData>(
      variables === undefined ? ['Pokemons.infinite'] : ['Pokemons.infinite', variables],
      (metaData) => fetcher<PokemonsQuery, PokemonsQueryVariables>(client, PokemonsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const PokemonStoreDocument = `
    query PokemonStore($skip: Int!) {
  pokemonStore(skip: $skip) {
    pokemon {
      id
      name
      attack
      defense
      health
      image
    }
    price
    isOwned
  }
}
    `;
export const usePokemonStoreQuery = <
      TData = PokemonStoreQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PokemonStoreQueryVariables,
      options?: UseQueryOptions<PokemonStoreQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PokemonStoreQuery, TError, TData>(
      ['PokemonStore', variables],
      fetcher<PokemonStoreQuery, PokemonStoreQueryVariables>(client, PokemonStoreDocument, variables, headers),
      options
    );
export const useInfinitePokemonStoreQuery = <
      TData = PokemonStoreQuery,
      TError = unknown
    >(
      _pageParamKey: keyof PokemonStoreQueryVariables,
      client: GraphQLClient,
      variables: PokemonStoreQueryVariables,
      options?: UseInfiniteQueryOptions<PokemonStoreQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<PokemonStoreQuery, TError, TData>(
      ['PokemonStore.infinite', variables],
      (metaData) => fetcher<PokemonStoreQuery, PokemonStoreQueryVariables>(client, PokemonStoreDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const WhoamiDocument = `
    query Whoami {
  whoami {
    id
    username
  }
}
    `;
export const useWhoamiQuery = <
      TData = WhoamiQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: WhoamiQueryVariables,
      options?: UseQueryOptions<WhoamiQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WhoamiQuery, TError, TData>(
      variables === undefined ? ['Whoami'] : ['Whoami', variables],
      fetcher<WhoamiQuery, WhoamiQueryVariables>(client, WhoamiDocument, variables, headers),
      options
    );
export const useInfiniteWhoamiQuery = <
      TData = WhoamiQuery,
      TError = unknown
    >(
      _pageParamKey: keyof WhoamiQueryVariables,
      client: GraphQLClient,
      variables?: WhoamiQueryVariables,
      options?: UseInfiniteQueryOptions<WhoamiQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<WhoamiQuery, TError, TData>(
      variables === undefined ? ['Whoami.infinite'] : ['Whoami.infinite', variables],
      (metaData) => fetcher<WhoamiQuery, WhoamiQueryVariables>(client, WhoamiDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const SigninDocument = `
    mutation Signin($data: UserInput!) {
  signin(data: $data) {
    id
    username
  }
}
    `;
export const useSigninMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SigninMutation, TError, SigninMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
      ['Signin'],
      (variables?: SigninMutationVariables) => fetcher<SigninMutation, SigninMutationVariables>(client, SigninDocument, variables, headers)(),
      options
    );