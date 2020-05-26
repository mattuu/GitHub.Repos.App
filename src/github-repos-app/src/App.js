import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './apollo-client'
import ReposList from './ReposList';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <div>
      <ReposList></ReposList>
    </div>
  </ApolloProvider>
);

export default App;
