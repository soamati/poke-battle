import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
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

export type BuyItemInput = {
  itemsWithCount: Array<ItemWithCount>;
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
  onInventory: Scalars['Float'];
  price: Scalars['Float'];
};

export type ItemWithCount = {
  count: Scalars['Int'];
  itemId: Scalars['Float'];
};

export type Mutation = {
  buyItems: Scalars['Boolean'];
  buyPokemon: Pokemon;
  signin: User;
  signout: Scalars['Boolean'];
  signup: User;
};


export type MutationBuyItemsArgs = {
  data: BuyItemInput;
};


export type MutationBuyPokemonArgs = {
  id: Scalars['Int'];
};


export type MutationSigninArgs = {
  data: UserInput;
};


export type MutationSignupArgs = {
  data: UserInput;
};

export type PageInfo = {
  count: Scalars['Int'];
  next?: Maybe<Scalars['Int']>;
  pages: Scalars['Int'];
  prev?: Maybe<Scalars['Int']>;
};

export type PaginatedPokemon = {
  info: PageInfo;
  results: Array<Pokemon>;
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
  pokemons: PaginatedPokemon;
  wallet?: Maybe<Wallet>;
  whoami?: Maybe<User>;
};


export type QueryItemStoreArgs = {
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryPokedexArgs = {
  id?: InputMaybe<Scalars['Float']>;
};


export type QueryPokemonStoreArgs = {
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryPokemonsArgs = {
  page?: InputMaybe<Scalars['Int']>;
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

export type Wallet = {
  amount: Scalars['Float'];
};

export type BuyItemMutationVariables = Exact<{
  data: BuyItemInput;
}>;


export type BuyItemMutation = { buyItems: boolean };

export type BuyPokemonMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type BuyPokemonMutation = { buyPokemon: { id: number, name: string, attack: number, defense: number, health: number, image: string } };

export type PokemonsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type PokemonsQuery = { pokemons: { info: { count: number, pages: number, next?: number | null, prev?: number | null }, results: Array<{ id: number, name: string, image: string, attack: number, defense: number, health: number }> } };

export type PokemonStoreQueryVariables = Exact<{
  skip: Scalars['Int'];
}>;


export type PokemonStoreQuery = { pokemonStore: Array<{ price: number, isOwned: boolean, pokemon: { id: number, name: string, attack: number, defense: number, health: number, image: string } }> };

export type ItemStoreQueryVariables = Exact<{
  skip: Scalars['Int'];
}>;


export type ItemStoreQuery = { itemStore: Array<{ price: number, onInventory: number, item: { id: number, name: string, value: number, mode: string, stat: { id: number, name: string } } }> };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { whoami?: { id: number, username: string } | null };

export type SigninMutationVariables = Exact<{
  data: UserInput;
}>;


export type SigninMutation = { signin: { id: number, username: string } };

export type WalletQueryVariables = Exact<{ [key: string]: never; }>;


export type WalletQuery = { wallet?: { amount: number } | null };


export const BuyItemDocument = `
    mutation BuyItem($data: BuyItemInput!) {
  buyItems(data: $data)
}
    `;
export const useBuyItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<BuyItemMutation, TError, BuyItemMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<BuyItemMutation, TError, BuyItemMutationVariables, TContext>(
      ['BuyItem'],
      (variables?: BuyItemMutationVariables) => fetcher<BuyItemMutation, BuyItemMutationVariables>(client, BuyItemDocument, variables, headers)(),
      options
    );
export const BuyPokemonDocument = `
    mutation BuyPokemon($id: Int!) {
  buyPokemon(id: $id) {
    id
    name
    attack
    defense
    health
    image
  }
}
    `;
export const useBuyPokemonMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<BuyPokemonMutation, TError, BuyPokemonMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<BuyPokemonMutation, TError, BuyPokemonMutationVariables, TContext>(
      ['BuyPokemon'],
      (variables?: BuyPokemonMutationVariables) => fetcher<BuyPokemonMutation, BuyPokemonMutationVariables>(client, BuyPokemonDocument, variables, headers)(),
      options
    );
export const PokemonsDocument = `
    query Pokemons($page: Int!) {
  pokemons(page: $page) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      image
      attack
      defense
      health
    }
  }
}
    `;
export const usePokemonsQuery = <
      TData = PokemonsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PokemonsQueryVariables,
      options?: UseQueryOptions<PokemonsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PokemonsQuery, TError, TData>(
      ['Pokemons', variables],
      fetcher<PokemonsQuery, PokemonsQueryVariables>(client, PokemonsDocument, variables, headers),
      options
    );
export const useInfinitePokemonsQuery = <
      TData = PokemonsQuery,
      TError = unknown
    >(
      _pageParamKey: keyof PokemonsQueryVariables,
      client: GraphQLClient,
      variables: PokemonsQueryVariables,
      options?: UseInfiniteQueryOptions<PokemonsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<PokemonsQuery, TError, TData>(
      ['Pokemons.infinite', variables],
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

export const ItemStoreDocument = `
    query ItemStore($skip: Int!) {
  itemStore(skip: $skip) {
    item {
      id
      name
      value
      mode
      stat {
        id
        name
      }
    }
    price
    onInventory
  }
}
    `;
export const useItemStoreQuery = <
      TData = ItemStoreQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ItemStoreQueryVariables,
      options?: UseQueryOptions<ItemStoreQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ItemStoreQuery, TError, TData>(
      ['ItemStore', variables],
      fetcher<ItemStoreQuery, ItemStoreQueryVariables>(client, ItemStoreDocument, variables, headers),
      options
    );
export const useInfiniteItemStoreQuery = <
      TData = ItemStoreQuery,
      TError = unknown
    >(
      _pageParamKey: keyof ItemStoreQueryVariables,
      client: GraphQLClient,
      variables: ItemStoreQueryVariables,
      options?: UseInfiniteQueryOptions<ItemStoreQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<ItemStoreQuery, TError, TData>(
      ['ItemStore.infinite', variables],
      (metaData) => fetcher<ItemStoreQuery, ItemStoreQueryVariables>(client, ItemStoreDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
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
export const WalletDocument = `
    query Wallet {
  wallet {
    amount
  }
}
    `;
export const useWalletQuery = <
      TData = WalletQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: WalletQueryVariables,
      options?: UseQueryOptions<WalletQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WalletQuery, TError, TData>(
      variables === undefined ? ['Wallet'] : ['Wallet', variables],
      fetcher<WalletQuery, WalletQueryVariables>(client, WalletDocument, variables, headers),
      options
    );
export const useInfiniteWalletQuery = <
      TData = WalletQuery,
      TError = unknown
    >(
      _pageParamKey: keyof WalletQueryVariables,
      client: GraphQLClient,
      variables?: WalletQueryVariables,
      options?: UseInfiniteQueryOptions<WalletQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<WalletQuery, TError, TData>(
      variables === undefined ? ['Wallet.infinite'] : ['Wallet.infinite', variables],
      (metaData) => fetcher<WalletQuery, WalletQueryVariables>(client, WalletDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );
