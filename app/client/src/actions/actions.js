export const SAVE_USER = 'SAVE_USER';
export const SAVE_EMAILIDS = 'SAVE_EMAILIDS';
export const UPDATE_UNIVERSITY_VIEW = 'UPDATE_UNIVERSITY_VIEW';
export const UPDATE_STUDENT_VIEW = 'UPDATE_STUDENT_VIEW';


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

export function UpdateUniversityView(obj) {
    console.log("updateEmployerView ");
    return {
        type : "UPDATE_UNIVERSITY_VIEW",
        obj                               // this is same as newItem : newItem in ES6
    }
}

export function UpdateStudentView(obj) {
    console.log("UpdateStudentView ");
    return {
        type : "UPDATE_STUDENT_VIEW",
        obj                               // this is same as newItem : newItem in ES6
    }
}