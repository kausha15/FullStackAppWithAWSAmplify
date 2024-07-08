import {Amplify, Storage} from "aws-amplify"
import {getCurrentUser, signOut } from 'aws-amplify/auth'
import { getUrl, uploadData } from 'aws-amplify/storage';
import { DataStore } from 'aws-amplify/datastore';
import { Post } from './models';

import amplifyconfig from './aws-exports';

Amplify.configure(amplifyconfig);

document.getElementById('create-post').addEventListener('submit', async e=>{
    e.preventDefault()

    try{
        const file = document.getElementById('img').files[0]
        // await Storage.put(file.name, file)
        const result = await uploadData({
            path: 'public/album/2024/1.jpg', 
            // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
            data: file
          }).result;
        const newPost = await DataStore.save(
            new Post({
                "description": document.getElementById('description').value,
                "image": file.name
            })
        );
        console.log('new post : ',newPost)

        

    }catch(e){
        console.log('error : '+e);
    }
})

const pullData = async()=>{
    try{
        const posts = await DataStore.query(Post)
        console.log('posts : ',posts)

        const postsWithPics = []

        for(const post of posts){
            try{
                const postPic = await getUrl({path : post.image})
                postsWithPics.push({...post, pic: postPic})
            }catch(e){
                console.log(e)
            }
        }
        console.log('get : ' +JSON.stringify(postsWithPics))
        const postsDiv = document.querySelector('.posts')
        postsWithPics.map(post =>{
            const postDiv = document.createElement('div')
            postsDiv.classList.add('post')
            const img = document.createElement('img')
            const p = document.createElement('p')
            p.innerText = post.description
            img.setAttribute('src', post.pic.url)
            postDiv.appendChild(img)
            postDiv.appendChild(p)
            postsDiv.appendChild(postDiv)

        })
    }catch(e){
        console.log(e);
    }
}

pullData()
let currentUser = null

const toggleNavBar = () => {
  if (currentUser) {
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('.logged-in').classList.add('hidden')
    document.querySelector('#sign-out').classList.remove('hidden')
    document.querySelector('#create-post').classList.remove('hidden')
  } else {
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('.logged-in').classList.remove('hidden')
    document.querySelector('#sign-out').classList.add('hidden')
    document.querySelector('#create-post').classList.add('hidden')
  }
}

const getCurrentUserFunc = async() =>{
    try{
        currentUser = await getCurrentUser()
    }catch(e){
        console.log(e)
        currentUser = null
    }
    toggleNavBar()
}

getCurrentUserFunc()

document.getElementById('sign-out').addEventListener('click', async() => {
    await signOut()
    window.location.href = '/'
})

// link: https://binaryville.com/images/characters/dolores-disc.png