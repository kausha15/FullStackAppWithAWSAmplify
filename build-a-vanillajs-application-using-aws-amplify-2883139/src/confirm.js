import { Auth, Amplify } from 'aws-amplify'
import {confirmSignUp} from 'aws-amplify/auth'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#confirm-form').addEventListener('submit', async e => {
  e.preventDefault()
  try{
    const params = (new URL(document.location)).searchParams
    const username = params.get('username')
    console.log('user name ' +username);
    const confirm = await confirmSignUp({
      username : username, 
      confirmationCode : document.getElementById('confirm').value
    })
    window.location.href = '/sign-in.html'
  }catch(e){
    console.log(e)
  }
  
})
