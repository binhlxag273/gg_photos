import { Box } from '@chakra-ui/react';
import {GoogleLogin} from 'react-google-login'
import { config } from '../config.js'
import '../index.css';
import { useNavigate } from 'react-router-dom';

function GLoginButton() {
	const navigate = useNavigate();
	const onSuccess = (res) => {
		console.log(">>>", res);	
		navigate('/');
	}

	const onFailure = (res) => {
		console.log(">>>>", res);
	}

	return (
		<Box mb={2}>
			<GoogleLogin
				className='Btn'
				clientId={config.clientId}
				buttonText="Login with Google"
				onSuccess={onSuccess}
				onFailure={onFailure}
				isSignedIn={true}
			/>
		</Box>
	);
}

export default GLoginButton;
