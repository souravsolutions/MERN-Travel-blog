import axios from "axios";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
      withCredentials: true,
    });
  }

  async signUp(fullName, email, password) {
    return this.client.post("/auth/signup", { fullName, email, password });
  }

  async login(email, password) {
    return this.client.post("/auth/login", { email, password });
  }

  async getCurrentUser() {
    return this.client.get("/auth/me");
  }

  async getAllStories() {
    return this.client.get("/stories/allstory");
  }

  async getStoryById(id) {
    return this.client.get(`/stories/allstory/${id}`);
  }

  async likes(id) {
    return this.client.patch(`/stories/allstory/${id}/like`);
  }
  
  async getUserStories() {
    return this.client.get("/stories/userstory");
  }
}

export default new ApiClient();
