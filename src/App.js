import React from 'react';
import Home from "./pages/Home"
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import { useMyContext } from './MyContext';

Amplify.configure(config);

export function App({ signOut, user }) {
  const { setUser, setMyPlants } = useMyContext();
  const invokeURL = 'https://6wux2wozxc.execute-api.us-east-2.amazonaws.com/v1';

  React.useEffect(() => { // set user upon login
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  React.useEffect(() => {
    if (user) {
      fetch(`${invokeURL}/plant?userId=${user.userId}`, { // call api to get all plants for specified user
        method: 'GET', // GET
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => setMyPlants(prev => {
          if (data.Items) {
            return data.Items.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
          } else {
            return []
          }
        }))
        .catch(error => console.error('Error:', error));
    }
  }, [user, setMyPlants])

  return (
    <>
      <Home signOut={signOut}></Home>
    </>
  );
}

export default withAuthenticator(App);