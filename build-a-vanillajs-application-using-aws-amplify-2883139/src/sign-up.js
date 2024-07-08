import { Amplify } from 'aws-amplify'
import {signUp} from 'aws-amplify/auth'
import config from './aws-exports'

Amplify.configure(config)

document.querySelector('#sign-up').addEventListener('submit', async e => {
  e.preventDefault()

  try{
    const username = document.querySelector('#email').value
    const {user} = await signUp({
        username,
        password : document.querySelector('#password').value,
        options:{
          userAttributes: {
            phone_number: document.querySelector('#phone-number').value
          }
        }
        // attributes: {
        //     phone_number: document.querySelector('#phone-number').value
        // }
    })

    window.location.href = '/confirm.html?username='+username

  }catch(e){
    console.log(e)
  }
})
