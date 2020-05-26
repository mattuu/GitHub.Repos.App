import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const REPOS_QUERY = gql(`
{
    viewer {
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          createdAt
          isFork
          description
          owner {
            login
          }
        }
      }
    }
  }
`)

const ReposList = () => (
    <Query query={REPOS_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( </p>;

            return data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                    <p>
                        {currency}: {rate}
                    </p>
                </div>
            ));
        }}
    </Query>
);
export default ReposList;