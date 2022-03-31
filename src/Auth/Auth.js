export default class Auth {
    static isLoggedIn = () => {
        const isLoggedin = localStorage.getItem('isLoggedIn')
        if(isLoggedin)
            return isLoggedin
        else
            return false
    }
    static loggedInUser = () => {
        const user = localStorage.getItem('user')
        if(user !=="" && user)
            return user
        else
            return ""
    }

    static setInfo = (email) => {
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('user', email);
    }
    static removeInfo = () => {
        localStorage.clear();
    }
}