import { createBrowserHistory, createMemoryHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    if (onNavigate) {
        history.listen(onNavigate)
    }

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />, el
    )
    return {
        onParentNavigate({ pathname: nextPathName }) {
            const { pathname } = history.location
            if (pathname !== nextPathName) {
                history.push(nextPathName)
            }
        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#auth-dev-root')
    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() })
    }
}

export { mount }

