export type Note = {
    id?: string,
    name: string,
    description: string,
    image: string
}

export type InitialNote = Omit<Note, "id">



