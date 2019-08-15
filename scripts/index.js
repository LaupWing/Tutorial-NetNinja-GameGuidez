// const setupGuides = (data)=>{
//   if(data.length){
//     let html = ''
//     data.forEach(doc=>{
//       const guide = doc.data()
//       const li = `
//         <li>
//           <div class="collapsible-header grey lighten-4">${guide.title}</div>
//           <div class="collapsible-body white">${guide.content}</div>
//         </li>
//       `
//       html+=li
//     })
//     document.querySelector('.guides').innerHTML = html  
//   }else{
//     document.querySelector('.guides').innerHTML = '<h5 class="center-align">Login to view guides</h5>'
//   }
// }


// const setupUi = (user)=>{
//   const loggedInLinks = document.querySelectorAll('.logged-in')
//   const loggedOutLinks = document.querySelectorAll('.logged-out')
//   const accountDetails = document.querySelector('.account-details')
//   const adminItems = document.querySelectorAll('.admin')
//   if(user){
//     if(user.admin){
//       adminItems.forEach(item=>item.style.display = 'block')
//     }
//     db.collection('users')
//       .doc(user.uid)
//       .get()
//       .then((doc)=>{
//         const html =  `
//           <div>Logged in as ${user.email}</div>
//           <div>${doc.data().bio}</div>
//           <div>${user.admin ? 'Admin':''}</div>
//         `
//         accountDetails.innerHTML = html
//         loggedInLinks.forEach(link=>link.style.display = 'block')
//         loggedOutLinks.forEach(link=>link.style.display = 'none')
//       })
//   }else{
//     accountDetails.innerHtml = ''
//     adminItems.forEach(item=>item.style.display = 'none')
//     loggedInLinks.forEach(link=>link.style.display = 'none')
//     loggedOutLinks.forEach(link=>link.style.display = 'block')
//   }
// }

// // setup materialize components
// document.addEventListener('DOMContentLoaded', function() {
//   var modals = document.querySelectorAll('.modal');
//   M.Modal.init(modals);
//   var items = document.querySelectorAll('.collapsible');
//   M.Collapsible.init(items);
// });