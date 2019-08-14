const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    // Get user info
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    console.log(email, password)
    auth.createUserWithEmailAndPassword(email, password)
        .then((cred)=>{
            console.log(cred.user);
            const modal = document.querySelector('#modal-signup')
            M.Modal.getInstance(modal).close()
            signupForm.reset()
        })
})

const logout = document.querySelector('#logout')
logout.addEventListener('click',(e)=>{
    e.preventDefault()
    auth.signOut()
        .then(()=>{
            console.log('user has logged out')
        })
})
