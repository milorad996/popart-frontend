import HttpService from "./HttpService";

class ListingService extends HttpService {
    getAll = async (page = 1) => {
        const { data } = await this.client.get(`/listings?page=${page}`);
        return data;
    };

    getCategories = async () => {
        const { data } = await this.client.get("/categories");
        return data;
    };
    createCategory = async (categoryData) => {
        try {
            const { data } = await this.client.post("/admin/categories", categoryData);
            console.log("data category", data);
            return data;
        } catch (error) {
            throw error;
        }
    };
    getCustomers = async () => {
        try {
            const { data } = await this.client.get("/admin/customers");
            return data;
        } catch (error) {
            throw error;
        }
    };

    create = async (formData) => {
        try {
            const { data } = await this.client.post("/listings", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        } catch (error) {
            throw error;
        }
    };
    update = async (id, formData) => {
        try {
            const { data } = await this.client.post(`/listings/${id}?_method=PUT`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        } catch (error) {
            throw error;
        }
    };
    getMyListings = async (page = 1) => {
        const { data } = await this.client.get(`/my-listings?page=${page}`);
        return data;
    };
    filter = async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const { data } = await this.client.get(`/listings/filter?${queryString}`);
        return data;
    };
    deleteListing = async (listingId) => {
        const { data } = await this.client.delete(`/listings/${listingId}`);
        return data;
    };

    getListing = async (listingId) => {
        const { data } = await this.client.get(`/listings/${listingId}`);
        return data;
    };
    getListingsByCategory = async (categoryId, page = 1) => {
        const { data } = await this.client.get(`/categories/${categoryId}/listings?page=${page}`);
        return data;
    };

}

const listingService = new ListingService();
export default listingService;
