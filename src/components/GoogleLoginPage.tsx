import React from 'react';
import {
	GoogleLogin,
	GoogleLoginProps,
	CredentialResponse,
} from '@react-oauth/google';

const GoogleLoginPage: React.FC = () => {
	const responseGoogle = (response: GoogleLoginProps) => {
		console.log(response);
	};

	return (
		<GoogleLogin
			onSuccess={async (credentialResponse: CredentialResponse) => {
				const userCredential = credentialResponse.credential;
			}}
			onError={() => {
				console.log('Something went wrong!');
			}}
			useOneTap
			auto_select
		/>
	);
};
export default GoogleLoginPage;
