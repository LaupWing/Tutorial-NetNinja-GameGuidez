What i learned from this tutorial?
*   Make adim users, and make normal users with firebase auth
*   Dont nest multiple `.then` in a function. Just return the promise and chain another `.then` on the end, this prevents the multiple layers of `.then`
*   Cloud functions
    *   Run code on the firebase server when you dont want the users to see your code
