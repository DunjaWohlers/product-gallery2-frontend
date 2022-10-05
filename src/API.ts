/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateImageInfoInput = {
  id?: string | null,
  image?: string | null,
  name?: string | null,
  tags?: Array< string | null > | null,
};

export type ModelImageInfoConditionInput = {
  image?: ModelStringInput | null,
  name?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  and?: Array< ModelImageInfoConditionInput | null > | null,
  or?: Array< ModelImageInfoConditionInput | null > | null,
  not?: ModelImageInfoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ImageInfo = {
  __typename: "ImageInfo",
  id: string,
  image?: string | null,
  name?: string | null,
  tags?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateImageInfoInput = {
  id: string,
  image?: string | null,
  name?: string | null,
  tags?: Array< string | null > | null,
};

export type DeleteImageInfoInput = {
  id: string,
};

export type ModelImageInfoFilterInput = {
  id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  name?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  and?: Array< ModelImageInfoFilterInput | null > | null,
  or?: Array< ModelImageInfoFilterInput | null > | null,
  not?: ModelImageInfoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelImageInfoConnection = {
  __typename: "ModelImageInfoConnection",
  items:  Array<ImageInfo | null >,
  nextToken?: string | null,
};

export type CreateImageInfoMutationVariables = {
  input: CreateImageInfoInput,
  condition?: ModelImageInfoConditionInput | null,
};

export type CreateImageInfoMutation = {
  createImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateImageInfoMutationVariables = {
  input: UpdateImageInfoInput,
  condition?: ModelImageInfoConditionInput | null,
};

export type UpdateImageInfoMutation = {
  updateImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteImageInfoMutationVariables = {
  input: DeleteImageInfoInput,
  condition?: ModelImageInfoConditionInput | null,
};

export type DeleteImageInfoMutation = {
  deleteImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetImageInfoQueryVariables = {
  id: string,
};

export type GetImageInfoQuery = {
  getImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListImageInfosQueryVariables = {
  filter?: ModelImageInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListImageInfosQuery = {
  listImageInfos?:  {
    __typename: "ModelImageInfoConnection",
    items:  Array< {
      __typename: "ImageInfo",
      id: string,
      image?: string | null,
      name?: string | null,
      tags?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateImageInfoSubscription = {
  onCreateImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateImageInfoSubscription = {
  onUpdateImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteImageInfoSubscription = {
  onDeleteImageInfo?:  {
    __typename: "ImageInfo",
    id: string,
    image?: string | null,
    name?: string | null,
    tags?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
