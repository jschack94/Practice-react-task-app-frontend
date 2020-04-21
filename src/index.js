import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers/index'
import {theme, ThemeProvider, CSSReset} from "@chakra-ui/core"

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    }
  }
}

const store = createStore(
	rootReducer, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={customTheme}>
			<CSSReset />
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
)
