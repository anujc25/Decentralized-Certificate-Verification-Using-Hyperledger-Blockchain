export const SAVE_USER = 'SAVE_USER';
export const SAVE_EMAILIDS = 'SAVE_EMAILIDS';


export function SaveUser(obj) {
    console.log("User Saved");
    return {
        type : "SAVE_USER",
        obj                               // this is same as newItem : newItem in ES6
    }
}

export function SaveEmailIds(obj) {
    console.log("EmailIds Saved");
    return {
        type : "SAVE_EMAILIDS",
        obj                               // this is same as newItem : newItem in ES6
    }
}