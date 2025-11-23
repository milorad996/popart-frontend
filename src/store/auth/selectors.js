export function selectActiveUser(state) {
    return state.auth.user;
}
export function selectIsAuthenticated(state) {
    return !!state.auth.token;
}
export function selectRegisterErrors(state) {
    return state.auth.registerErrors;
}
export function selectSuccessfullyCreatedUser(state) {
    return state.auth.successfullyCreatedUser;
}
export function selectLoginErrors(state) {
    return state.auth.loginErrors;
}
export function selectUsers(state) {
    return state.listings.users || [];
}