export interface IPropsLogin {
    setUsername: (value: string) => void
    setPassword: (value: string) => void
    navigate: (to: string) => void
}

export interface IPropsRegister {
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setRepeatPassword: (value: string) => void
    setUsername: (value: string) => void
    navigate: (to: string) => void
}

export interface IAuthState {
    user: {},
    isLogged: boolean
}

interface IPublicUser {
    id: number,
    firstName: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    watchList: [IWatchList]
}

interface IWatchList {
    id: number,
    name: string,
    assetId: string,
    createdAt: string,
    updatedAt: string,
    user: number
}

