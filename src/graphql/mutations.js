/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateImageInfo(
    $input: CreateImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    createImageInfo(input: $input, condition: $condition) {
      id
      name
      tags
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateImageInfo(
    $input: UpdateImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    updateImageInfo(input: $input, condition: $condition) {
      id
      name
      tags
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteImageInfo(
    $input: DeleteImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    deleteImageInfo(input: $input, condition: $condition) {
      id
      name
      tags
      image
      createdAt
      updatedAt
    }
  }
`;
