export const SAVE_USER = 'SAVE_USER';


export function SaveUser(obj) {
    console.log("User Loaded");
    return {
        type : "SAVE_USER",
        obj                               // this is same as newItem : newItem in ES6
    }
}