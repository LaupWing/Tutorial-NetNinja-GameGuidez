
// Listen for aut states changes
auth.onAuthStateChanged((user)=>{
    console.log(user);
    if(user){
        db.collection('guides').onSnapshot(snapshots=>{
            setupGuides(snapshots.docs);
            setupUi(user);
        })
        .catch(err=>{
            console.log(err.message)
        });
    }else{
        setupUi(user);
        setupGuides([]);
        console.log('user has logged out');
    }
});


// Create new guides
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('guides')
        .add({
            title: createForm['title'].value,
            content: createForm['content'].value
        })
        .then(()=>{
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createForm.reset();
        })
        .catch(err=>{
            console.log('You have to be logged in', err.message)
        });;
});


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    // Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
        .then((cred)=>{
            console.log(cred.user);
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        });
});

const logout = document.querySelector('#logout')
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut()
        .then(()=>{
            console.log('user has logged out');
        });
});

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email,password)
        .then((cred)=>{
            console.log(cred.user)
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        });
});
