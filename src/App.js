import React from 'react';
import Home from './pages/home';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import { useMyContext } from './MyContext';

Amplify.configure(config);

export function App({ signOut, user }) {

  const { setUser } = useMyContext();

  React.useEffect(() => { // set user upon login
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <>
      <Home signOut={signOut}></Home>
    </>
  );
}

export default withAuthenticator(App);