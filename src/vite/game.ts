export interface Game{
    name: string,
    id: string,
    imagePath:any,
    desk: string,
}
export interface Club{
    thirdPartyId: string,
    name: string,
}

export interface RouterInterface {
    path: string,
    name: string,
    children?: Array<RouterInterface>
}