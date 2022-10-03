export interface MyGraphQLResult {
    data?: {
        listTodos:
            { items: { name: string, description: string }[] }
    };
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
}
