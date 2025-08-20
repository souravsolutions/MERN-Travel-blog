import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useAuthStore from "../context/AuthContext";

function Body() {
  const { stories, likes, user } = useAuthStore();

  const [updating, setUpdating] = useState(null);

  const handleFavourite = async (storyId) => {
    try {
      setUpdating(storyId);
      await likes(storyId);
    } catch (error) {
      console.error("Error toggling favourite:", error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 '>
      {stories.map((story) => (
        <div
          key={story._id}
          className='bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 mb-6 sm:mb-8 overflow-hidden group'
        >
          <div className='flex flex-col md:flex-row'>
            <div className='relative md:w-2/5 lg:w-2/5 aspect-[4/3] overflow-hidden'>
              <img
                src={story.imageUrl}
                alt={story.title}
                className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <div className='absolute top-3 left-3 sm:top-5 sm:left-5'>
                <span className='px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r text-xs sm:text-sm font-semibold text-gray-400 rounded-full shadow-lg backdrop-blur-sm border border-white/20'>
                  Travel
                </span>
              </div>
            </div>

            <div className='p-4 sm:p-6 lg:p-8 md:w-3/5 lg:w-3/5 flex flex-col justify-between'>
              <div>
                <Link to={`/dashboard/${story._id}`}>
                  <h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 transition-all duration-300 cursor-pointer leading-tight'>
                    {story.title
                      ? story.title.replace(/^"|"$/g, "")
                      : "No Title"}
                  </h2>
                  <div className='flex items-center mb-3 sm:mb-5'>
                    <div className='w-2 h-2 bg-gradient-to-r from-black to-white rounded-full mr-3'></div>
                    <p className='text-slate-600 font-semibold text-sm sm:text-base lg:text-lg'>
                      By:{" "}
                      {story.userId?.fullName
                        ? story.userId.fullName.replace(/^"|"$/g, "")
                        : "Unknown"}
                    </p>
                  </div>
                  <p className='text-slate-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-medium'>
                    {story.story
                      .replace(/^"|"$/g, "")
                      .split(" ")
                      .slice(0, 6)
                      .join(" ") + "..."}
                  </p>
                  {story.tags && story.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6'>
                      {story.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-xs sm:text-sm font-semibold text-slate-700 rounded-full shadow-md border border-slate-300/50 hover:shadow-lg hover:scale-105 transition-all duration-200'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </div>

              <div className='flex justify-between items-center mt-3 sm:mt-4'>
                <div className='text-xs sm:text-sm text-slate-500 font-medium'>
                  Click to read more ...
                </div>
                <button
                  onClick={() => handleFavourite(story._id)}
                  disabled={updating === story._id}
                  className='p-2 sm:p-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 active:scale-95 group/heart disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Heart
                    className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-all duration-300 group-hover/heart:scale-110 ${
                      story.likes.includes(user._id)
                        ? "fill-red-500 text-red-500 drop-shadow-lg"
                        : "fill-white text-white stroke-slate-800 stroke-2"
                    }`}
                  />
                  <p>{story.likes.length}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Body;
