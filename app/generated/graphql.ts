import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a snippet */
  createSnippet: Snippet;
};


export type MutationCreateSnippetArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** List of snippets */
  snippets: Array<Snippet>;
  /** A user */
  user: User;
  /** List of users */
  users: Array<User>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Snippet = {
  __typename?: 'Snippet';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  postedAt: Scalars['String']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetSnippetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSnippetsQuery = { __typename?: 'Query', snippets: Array<{ __typename?: 'Snippet', code: string, id: number, language: string, postedAt: string, userId?: number | null }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string }> };


export const GetSnippetsDocument = gql`
    query GetSnippets {
  snippets {
    code
    id
    language
    postedAt
    userId
  }
}
    `;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetSnippets(variables?: GetSnippetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSnippetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSnippetsQuery>(GetSnippetsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSnippets', 'query', variables);
    },
    GetUsers(variables?: GetUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsers', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;