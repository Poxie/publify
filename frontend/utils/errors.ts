export const isAuthError = (error: object) => {
    if(JSON.stringify(error).includes('Unauthorized')) return true;
    return false;
}
export const isIncorrectCredentials = (error: object) => {
    if(JSON.stringify(error).includes('Incorrect credentials')) return true;
    return false;
}