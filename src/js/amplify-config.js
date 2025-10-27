import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'YOUR_USER_POOL_ID',
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID',
      region: 'us-east-1'
    }
  }
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;