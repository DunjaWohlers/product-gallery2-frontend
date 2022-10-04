import {ImageInfoType} from "./Note";

export interface MyGraphQLResult {
    data?: {
        listImageInfos:
            { items: ImageInfoType [] }
    };
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}
