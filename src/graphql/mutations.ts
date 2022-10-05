/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createImageInfo = /* GraphQL */ `
  mutation CreateImageInfo(
    $input: CreateImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    createImageInfo(input: $input, condition: $condition) {
      id
      image
      name
      tags
      createdAt
      updatedAt
    }
  }
`;
export const updateImageInfo = /* GraphQL */ `
  mutation UpdateImageInfo(
    $input: UpdateImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    updateImageInfo(input: $input, condition: $condition) {
      id
      image
      name
      tags
      createdAt
      updatedAt
    }
  }
`;
export const deleteImageInfo = /* GraphQL */ `
  mutation DeleteImageInfo(
    $input: DeleteImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    deleteImageInfo(input: $input, condition: $condition) {
      id
      image
      name
      tags
      createdAt
      updatedAt
    }
  }
`;
