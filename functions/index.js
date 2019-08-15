const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{
    // get user and add custom claim(adim)
    return admin.auth().getUserByEmail(data.email)
        .then(user=>{
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
        })
        .then(()=>{
            return {
                message: `Succes! ${data.email} has been made a admin`
            }
        })
        .catch(err=>{
            return err
        });
});