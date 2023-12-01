import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/auth';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


//export const TokenContext = createContext(null);

function Router(){

  //const [token, setToken] = useState('');

  //const TOKEN = "d56dafcdab5c5feb9b13bcc6e320a2b0058e33a1";

  return (
    <React.StrictMode>
      <CookiesProvider>
        {/* <TokenContext.Provider value={{token, setToken}}> */}
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Auth/>}/>
              <Route exact path="/places" element={<App/>}/>
            </Routes>
          </BrowserRouter>
        {/* </TokenContext.Provider> */}
      </CookiesProvider>
    {/* <Auth/>
    <App/> */}
  </React.StrictMode>
  )
}

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(<Router/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
