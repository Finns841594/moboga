import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './App.css';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GoogleOAuthProvider
			clientId={`608282841775-cr9vmcq2inkojijdi68ss3oe01q3vrvj.apps.googleusercontent.com`}
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>
);
