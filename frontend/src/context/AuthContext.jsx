import { create } from "zustand";
import ApiClient from "../service/apiClient.js";

const useAuthStore = create((set) => ({
  user: null,
  stories: [],
  currentStory: null,
  isLoading: true,

  fetchUser: async () => {
    try {
      const res = await ApiClient.getCurrentUser();
      set({ user: res.data.data || null });

      if (res.data.data) {
        const storiesRes = await ApiClient.getUserStories();
        set({ stories: storiesRes.data.data || [] });
      }
    } catch (err) {
      set({ user: null, stories: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  login: (userData) => set({ user: userData }),
  allStory: (story) => set({ stories: story }),

  fetchStoryById: async (id) => {
    try {
      const res = await ApiClient.getStoryById(id);
      set({ currentStory: res.data.data });
      return res.data.data;
    } catch (err) {
      console.error("Error fetching story:", err);
    }
  },

  likes: async (id) => {
    try {
      const res = await ApiClient.likes(id);
      const updatedStory = res.data.data;

      set((state) => ({
        stories: state.stories.map((story) =>
          story._id === updatedStory._id ? updatedStory : story
        ),
        currentStory:
          state.currentStory && state.currentStory._id === updatedStory._id
            ? updatedStory
            : state.currentStory,
      }));

      return updatedStory;
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  },
  
}));

export default useAuthStore;
