import * as AWSCognito from "amazon-cognito-identity-js";


export class CognitoServiceProvider {
  _POOL_DATA = {
    UserPoolId: process.env.REACT_APP_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
  };


  signUp(name, email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email })
      );

      userPool.signUp(name, password, userAttribute, null, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }
  
  confirmUser(verificationCode, userName) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: userName,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }


  authenticate(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {

          // the api doesn't accept this field back
          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });
  }
}

