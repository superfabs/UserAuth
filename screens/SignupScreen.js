import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}) { //the email and password are validated in the AuthContent component
    setIsAuthenticating(true); //loading spinner
    try {
      const token = await createUser(email, password); //the token will be returned from auth.js file as response.data.idToken
      authCtx.authenticate(token);
    } catch (error) {
        Alert.alert('Authentication failed', 'Please check your credentials');
        setIsAuthenticating(false);
    }
      
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='creating user...'/>;
  }

  return <AuthContent onAuthenticate={signupHandler}/>; //after validate the credentials, it will send the credentials to the signupHandler function
}

export default SignupScreen;