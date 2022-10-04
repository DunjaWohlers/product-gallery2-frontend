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
  mutation UpdateTodo(
    $input: UpdateImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
  mutation DeleteTodo(
    $input: DeleteImageInfoInput!
    $condition: ModelImageInfoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      tags
      image
      createdAt
      updatedAt
    }
  }
`;
