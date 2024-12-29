export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'APP-REDUCER/CHANGE-THEME':
            return {
                ...state, themeMode: action.payload.themeMode
            }
        default:
            return state
    }
}

// Action Type
export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

// Action creator
export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: 'APP-REDUCER/CHANGE-THEME',
        payload: {
            themeMode
        }
    } as const
}

// Action types
type ActionsType = ChangeThemeActionType