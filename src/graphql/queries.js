/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetImageInfo($id: ID!) {
    getImageInfo(id: $id) {
      id
      name
      tags
      image
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListImageInfos(
    $filter: ModelImageInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tags
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
