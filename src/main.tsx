import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './App.css';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>

	<GoogleOAuthProvider
		clientId={`608282841775-39jt11hsn1l6hjau7ts44u4j6ichb3dj.apps.googleusercontent.com`}
	>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</GoogleOAuthProvider>
	//  </React.StrictMode>,
);
