/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImageInfo = /* GraphQL */ `
  query GetImageInfo($id: ID!) {
    getImageInfo(id: $id) {
      id
      image
      name
      tags
      createdAt
      updatedAt
    }
  }
`;
export const listImageInfos = /* GraphQL */ `
  query ListImageInfos(
    $filter: ModelImageInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        name
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
