import { create } from "zustand";
import ApiClient from "../service/apiClient.js";

const useAuthStore = create((set) => ({
  user: null,
  stories: [],
  currentStory: null,
  isLoading: true,
  userStories: [],
  hasFetched: false,

  // login: (userData) => set({ user: userData }),
  // allStory: (stories) => set({ stories }),

  fetchUser: async () => {
    try {
      const res = await ApiClient.getCurrentUser();
      set({ user: res.data.data || null });

      if (res.data.data) {
        const storiesRes = await ApiClient.getAllStories();
        set({ stories: storiesRes.data.data || [] });
      }
    } catch (err) {
      set({ user: null, stories: [] });
    } finally {
      set({ isLoading: false });
    }
  },

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

  fetchUserStories: async () => {
    try {
      const res = await ApiClient.getUserStories();
      set({ isLoading: true, hasFetched: false });

      if (res.data.data) {
        set({ userStories: res.data.data || [] });
      }
    } catch (err) {
      console.error("Error fetching user stories:", err);
      set({ userStories: [] });
    } finally {
      set({ isLoading: false ,hasFetched: true});
    }
  },
}));

export default useAuthStore;
