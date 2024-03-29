export const isAuthError = (error: object) => {
    if(JSON.stringify(error).includes('Unauthorized')) return true;
    return false;
}
export const isIncorrectCredentials = (error: object) => {
    if(JSON.stringify(error).includes('Incorrect credentials')) return true;
    return false;
}
export const isBadRequest = (error: object) => {
    if(JSON.stringify(error).includes('Bad request')) return true;
    return false;
}