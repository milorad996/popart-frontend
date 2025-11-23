import * as authSagas from "./auth/saga";
import * as listingsSagas from "./listings/saga";

const sagas = {
    ...authSagas,
    ...listingsSagas,
};

export default sagas;