export type ImageInfoType = {
    id: string,
    name: string,
    tags: string[],
    image: string
}

export type InitialImageInfo = Omit<ImageInfoType, "id">
