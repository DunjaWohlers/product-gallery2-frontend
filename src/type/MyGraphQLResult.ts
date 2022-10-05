import {ImageInfoType} from "./ImageInfoType";

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
