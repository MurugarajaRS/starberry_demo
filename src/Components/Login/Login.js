import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import Auth from '../../Auth/Auth'
import { Alert } from '@mui/material';
import validator from 'validator';
import { EMAIL, PASSWORD } from '../../Static/Consts'



const theme = createTheme();

const SignIn = (props) => {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const isLoggedIn = Auth.isLoggedIn();
    isLoggedIn && history('/property')
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    console.log(data.get('password').length >= 8)
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(!email || !data.get('password')){
        setErrorMessage('Email ID and password should not be empty')
    }
    else if(!validator.isEmail(email)){
        setErrorMessage('Please enter valid email id')
    }
    else if(data.get('password').length < 8){
        console.log("comming")
        setErrorMessage('Password length should atleast 8 characters')
    }
    else{
        if(email === EMAIL && data.get('password') === PASSWORD){
            Auth.setInfo(email)
            setErrorMessage('')
            history('/property')
        }
        else{
            setErrorMessage('Email ID and Password you have entered is not matching')
        }
    }
  };

  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" style={{marginTop:"-20px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className='message-section'> 
            {errorMessage !== '' && <Alert severity="error" onClose={() => setErrorMessage('')} dismissible><p>{errorMessage}</p></Alert>}
          </div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type ="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;