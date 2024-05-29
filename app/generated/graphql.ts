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

export type HighlightedSnippet = {
  __typename?: 'HighlightedSnippet';
  code: Scalars['String']['output'];
  highlightedCodeHtml: Scalars['String']['output'];
  id: Scalars['String']['output'];
  language: Scalars['String']['output'];
  postedAt: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a snippet */
  createSnippet: HighlightedSnippet;
  /** Delete a snippet */
  deleteSnippet: HighlightedSnippet;
};


export type MutationCreateSnippetArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteSnippetArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a snippet by ID */
  snippet: HighlightedSnippet;
  /** Get list of snippets */
  snippets: Array<HighlightedSnippet>;
};


export type QuerySnippetArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GetSnippetQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetSnippetQuery = { __typename?: 'Query', snippet: { __typename?: 'HighlightedSnippet', code: string, highlightedCodeHtml: string, id: string, language: string, postedAt: string, title: string, userId: string, user: { __typename?: 'User', displayName: string, id: string, imageUrl: string, username: string } } };

export type GetSnippetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSnippetsQuery = { __typename?: 'Query', snippets: Array<{ __typename?: 'HighlightedSnippet', code: string, highlightedCodeHtml: string, id: string, language: string, postedAt: string, title: string, userId: string, user: { __typename?: 'User', displayName: string, id: string, imageUrl: string, username: string } }> };

export type CreateSnippetMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  code: Scalars['String']['input'];
  language: Scalars['String']['input'];
}>;


export type CreateSnippetMutation = { __typename?: 'Mutation', createSnippet: { __typename?: 'HighlightedSnippet', code: string, id: string, language: string, postedAt: string, title: string, userId: string } };


export const GetSnippetDocument = gql`
    query GetSnippet($id: String!) {
  snippet(id: $id) {
    code
    highlightedCodeHtml
    id
    language
    postedAt
    title
    userId
    user {
      displayName
      id
      imageUrl
      username
    }
  }
}
    `;
export const GetSnippetsDocument = gql`
    query GetSnippets {
  snippets {
    code
    highlightedCodeHtml
    id
    language
    postedAt
    title
    userId
    user {
      displayName
      id
      imageUrl
      username
    }
  }
}
    `;
export const CreateSnippetDocument = gql`
    mutation CreateSnippet($userId: String!, $title: String!, $code: String!, $language: String!) {
  createSnippet(userId: $userId, title: $title, code: $code, language: $language) {
    code
    id
    language
    postedAt
    title
    userId
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetSnippet(variables: GetSnippetQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSnippetQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSnippetQuery>(GetSnippetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSnippet', 'query', variables);
    },
    GetSnippets(variables?: GetSnippetsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSnippetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSnippetsQuery>(GetSnippetsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSnippets', 'query', variables);
    },
    CreateSnippet(variables: CreateSnippetMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateSnippetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSnippetMutation>(CreateSnippetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateSnippet', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;