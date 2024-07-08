import { Auth, Amplify } from 'aws-amplify'
import {signIn} from 'aws-amplify/auth'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#sign-in').addEventListener('submit', async e => {
  e.preventDefault()

  const username = document.querySelector('#email').value
  const password = document.querySelector('#password').value

  try{
    const user = await signIn({
        username : username, 
        password : password
    })
    window.location.href = '/'
  }catch(e){
    console.log(e)
  }
})
