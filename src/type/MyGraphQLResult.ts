import {Note} from "./Note";

export interface MyGraphQLResult {
    data?: {
        listTodos:
            { items: Note [] }
    };
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}
