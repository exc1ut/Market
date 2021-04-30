import { remote } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router } from 'react-router-dom';

localStorage.setItem('serverInfo', remote.getGlobal('serverAddress'));
console.log(remote.getGlobal('serverAddress'));

const queryClient = new QueryClient();

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
