import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
  __typename?: 'InventoryItem';
  item: Item;
  units: Scalars['Int'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  mode: Scalars['String'];
  name: Scalars['String'];
  stat: Stat;
  value: Scalars['Float'];
};

export type ItemStore = {
  __typename?: 'ItemStore';
  item: Item;
  price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  __typename?: 'PokedexItem';
  luck: Scalars['Float'];
  pokemon: Pokemon;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  attack: Scalars['Float'];
  defense: Scalars['Float'];
  health: Scalars['Float'];
  id: Scalars['Float'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type PokemonStore = {
  __typename?: 'PokemonStore';
  pokemon: Pokemon;
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
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
  skip?: InputMaybe<Scalars['Float']>;
};

export type Stat = {
  __typename?: 'Stat';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type PokemonsQueryVariables = Exact<{ [key: string]: never; }>;


export type PokemonsQuery = { __typename?: 'Query', pokemons: Array<{ __typename?: 'Pokemon', id: number, name: string }> };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami?: { __typename?: 'User', id: number, username: string } | null };

export type SigninMutationVariables = Exact<{
  data: UserInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'User', id: number, username: string } };


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