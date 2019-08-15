// Add admin cloud functions
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value
    const addAdminRole = functions.httpsCallable('addAdminRole')
    addAdminRole({email: adminEmail})
        .then(result=>{
            console.log(result)
        })
});

// Listen for aut states changes
auth.onAuthStateChanged((user)=>{
    console.log(user);
    if(user){
        user.getIdTokenResult().then(idTokenResult=>{
            user.admin = idTokenResult.claims.admin
            setupUi(user);
        })
        db.collection('guides').onSnapshot(snapshots=>{
            setupGuides(snapshots.docs);
        }, err=>{
            console.log(err);
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
            return db.collection('users').doc(cred.user.uid).set({
                bio: signupForm['signup-bio'].value
            });
        })
        .then(()=>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
            signupForm.querySelector('error').innerHTML = '';
        })
        .catch(err=>{
            signupForm.querySelector('error').innerHTML = err.message;
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
            loginForm.querySelector('.error').innerHTML = '';
        })
        .catch(err=>{
            loginForm.querySelector('.error').innerHTML = err.message;
        });
});



const setupGuides = (data)=>{
    if(data.length){
      let html = ''
      data.forEach(doc=>{
        const guide = doc.data()
        const li = `
          <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
          </li>
        `
        html+=li
      })
      document.querySelector('.guides').innerHTML = html  
    }else{
      document.querySelector('.guides').innerHTML = '<h5 class="center-align">Login to view guides</h5>'
    }
  }
  
  
  const setupUi = (user)=>{
    const loggedInLinks = document.querySelectorAll('.logged-in')
    const loggedOutLinks = document.querySelectorAll('.logged-out')
    const accountDetails = document.querySelector('.account-details')
    const adminItems = document.querySelectorAll('.admin')
    if(user){
      if(user.admin){
        adminItems.forEach(item=>item.style.display = 'block')
      }
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc)=>{
          const html =  `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div>${user.admin ? 'Admin':''}</div>
          `
          accountDetails.innerHTML = html
          loggedInLinks.forEach(link=>link.style.display = 'block')
          loggedOutLinks.forEach(link=>link.style.display = 'none')
        })
    }else{
      accountDetails.innerHtml = ''
      adminItems.forEach(item=>item.style.display = 'none')
      loggedInLinks.forEach(link=>link.style.display = 'none')
      loggedOutLinks.forEach(link=>link.style.display = 'block')
    }
  }
  
  // setup materialize components
  document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  });