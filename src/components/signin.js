import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from './firebase.js';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    paddingTop: 15,
  },
  button: {
    paddingTop: 16,
  },
});

const db = firebase.database().ref();

export default function Signin({state}) {
	const classes = useStyles();

	const [user, setUser] = useState(null);

	useEffect(() => {
	  firebase.auth().onAuthStateChanged(setUser);
	}, []);

	const uiConfig = {
	  signInFlow: 'popup',
	  signInOptions: [
	    firebase.auth.GoogleAuthProvider.PROVIDER_ID
	  ],
	  callbacks: {
	    signInSuccessWithAuthResult: (result) => {
        // update user record in database whenever the user signs in
	        db.child("carts").child(`${result.user.uid}`)
	            .update({
	                displayName: result.user.displayName,
	                email: result.user.email,
	            })
	            .catch(error => alert(error));

	        return false;
	    }
	  }
	};

	const Banner = ({ user}) => (
	  <React.Fragment>
	    { user ? <Welcome user={ user } /> : <Sign/> }
	  </React.Fragment>
	);

	const handleSignOutClick = () => {
		firebase.auth().signOut();
		state.setUid(null);
	}

	const Welcome = ({ user }) => (
		<div>
			<Grid container spacing={3}>
          		<Grid item xs={12} sm={8} >
          			<Typography className={classes.root} color="textSecondary" component="p" align="right">
		               Welcome, {user.displayName}
		            </Typography>
          		</Grid>
          		<Grid item xs={12} sm={4} >
          			<Button className={classes.button} color="inherit" primary onClick={() => handleSignOutClick()} >
						Log out
					</Button>
          		</Grid>
          	</Grid>
	    </div>
	);

	const Sign = () => (
	  <StyledFirebaseAuth
	    uiConfig={uiConfig}
	    firebaseAuth={firebase.auth()}
	    
	  />
	);

	return (<Banner user={ user } />);
}
