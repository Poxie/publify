export const isAuthError = (error: object) => {
    if(JSON.stringify(error).includes('Unauthorized')) return true;
    return false;
}