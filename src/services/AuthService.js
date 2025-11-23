import HttpService from "./HttpService";

class AuthService extends HttpService {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    async login(credentials) {
        const { data } = await this.client.post("/login", credentials);
        return data;
    }

    register = async (userData) => {
        const { data } = await this.client.post("/register", userData);
        return data;
    };

    getMyProfile = async () => {
        const { data } = await this.client.get("/customer-profile");
        return data;
    };

    logout = async () => {
        await this.client.post("/logout");
    };

}

const authService = new AuthService();

export default authService;