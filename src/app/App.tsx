import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header";
import {Main} from "./Main";
import {useAppSelector} from "../common/hooks/useAppSelectors";

export type ThemeMode = 'dark' | 'light'
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export const App = () => {

    const themeMode = useAppSelector(state => state.theme.themeMode)
    const theme = getTheme(themeMode)

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    )
}