import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../context/AuthContext";
import { Heart } from "lucide-react";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import debounce from "lodash/debounce";

function SingleStory() {
  const { id } = useParams();
  const [updating, setUpdating] = useState(null);

  const { user, likes, fetchStoryById, currentStory } = useAuthStore();

  useEffect(() => {
    fetchStoryById(id);
  }, [id,user]);

  const debouncedFavourite = useCallback(
    debounce(async (storyId) => {
      try {
        setUpdating(storyId);
        await likes(storyId);
      } catch (error) {
        console.error("Error toggling favourite:", error);
      } finally {
        setUpdating(null);
      }
    }, 400),
    [likes]
  );

  const handleFavourite = (storyId) => {
    debouncedFavourite(storyId);
  };

  const story = currentStory;

  if (!story) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
          <p className='mt-4 text-lg font-medium text-gray-700'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='relative'>
        <img
          src={story.imageUrl}
          alt={story.title}
          className='w-full h-96 object-cover'
        />
        <div className='absolute inset-0 bg-black opacity-70 flex items-end'>
          <div className='container mx-auto px-4 py-8'>
            <button className='mb-6 flex items-center text-white hover:text-blue-200 transition-colors'>
              <Link to='/dashboard' className='flex items-center'>
                <ArrowLeft size={20} className='mr-2' />
                Back to Blogs
              </Link>
            </button>

            <div className='max-w-4xl'>
              {story.tags.map((tag, index) => (
                <span
                  key={index}
                  className='text-white px-3 py-2 rounded-full text-sm font-medium mb-4 inline-block'
                >
                  {tag}
                </span>
              ))}
              <h1 className='text-3xl md:text-5xl font-bold text-white mb-4'>
                {story.title ? story.title.replace(/^"|"$/g, "") : "No Title"}
              </h1>

              <div className='flex items-center space-x-6 text-white/90'>
                <div className='flex items-center'>
                  <User size={16} className='mr-2' />
                  {story.userId?.fullName}
                </div>
                <div className='flex items-center'>
                  <Calendar size={16} className='mr-2' />
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
                <div className='flex items-center'>
                  <Clock size={16} className='mr-2' />
                  {10}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-between mb-8 pb-4 border-b border-gray-200'>
            <p className='text-xl text-gray-600 font-medium'>
              {story.title ? story.title.replace(/^"|"$/g, "") : "No Title"}
            </p>

            <div className='flex items-center space-x-4'>
              <button
                onClick={() => handleFavourite(id)}
                disabled={updating === id}
                className='p-2 sm:p-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 active:scale-95 group/heart disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Heart
                  className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-all duration-300 group-hover/heart:scale-110 ${
                    story.likes.map(String).includes(String(user?._id))
                      ? "fill-red-500 text-red-500 drop-shadow-lg"
                      : "fill-white text-white stroke-slate-800 stroke-2"
                  }`}
                />
                <p>{story.likes.length}</p>
              </button>

              <button className='flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors'>
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div
            className='prose prose-lg max-w-none'
            dangerouslySetInnerHTML={{
              __html: story.story.replace(/^"|"$/g, ""),
            }}
            style={{
              lineHeight: "1.8",
              fontSize: "18px",
              color: "#374151",
            }}
          />

          <div className='mt-12 pt-8 border-t border-gray-200'>
            <div className='bg-gray-50 rounded-2xl p-6'>
              <div className='flex items-center'>
                <div className='ml-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {story.userId?.fullName}
                  </h3>
                  <p className='text-gray-600'>
                    Follow me on social media for more stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStory;
