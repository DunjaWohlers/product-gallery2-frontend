export type Note = {
    id: string,
    name: string,
    description: string
}

export type InitialNote = Omit<Note, "id">
