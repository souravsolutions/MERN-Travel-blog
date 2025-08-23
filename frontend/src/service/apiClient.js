import axios from "axios";

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
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

  async deleteUserStory(id) {
    return this.client.delete(`/stories/delete/${id}`);
  }

  // async uploadStory(data) {
  //   return this.client.post("/stories/addstory", data);
  // }

  async uploadStory(data) {
    return this.client.post("/stories/addstory", data);
  }

  async editStory(id, data) {
    return this.client.put(`/stories/edit/${id}`, data);
  }
}

export default new ApiClient();
