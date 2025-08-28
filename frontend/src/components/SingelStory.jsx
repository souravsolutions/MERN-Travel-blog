import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../context/AuthContext";
import { Heart } from "lucide-react";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import debounce from "lodash/debounce";
import Loading from "./Loading";

function SingleStory() {
  const { id } = useParams();
  const [updating, setUpdating] = useState(null);

  const { user, likes, fetchStoryById, currentStory } = useAuthStore();

  useEffect(() => {
    fetchStoryById(id);
  }, [id, user]);

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
    return <Loading />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='relative'>
        <img
          src={story.imageUrl}
          srcSet={`${story.imageUrl}?w=640 640w, ${story.imageUrl}?w=960 960w, ${story.imageUrl}?w=1280 1280w`}
          alt={story.title}
          width={1280}
          height={960}
          loading='eager'
          className='w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-[500px] xl:h-[600px] object-cover'
        />
        
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30'>
          <div className='container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-4 sm:py-6 lg:py-8'>
            
            <div className='flex-shrink-0'>
              <Link 
                to='/dashboard' 
                className='inline-flex items-center text-white hover:text-blue-200 transition-all duration-300 font-medium text-sm sm:text-base
                           rounded-full px-3 py-2 sm:px-4 sm:py-2.5 active:scale-95 '
              >
                <ArrowLeft size={16} className='mr-1.5 sm:mr-2 flex-shrink-0' />
                <span className='whitespace-nowrap'>Back to Blogs</span>
              </Link>
            </div>

            <div className='flex-1 flex items-end'>
              <div className='w-full max-w-4xl'>
                <div className='flex flex-wrap gap-2 mb-3 sm:mb-4'>
                  {story.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='text-white bg-white/20 backdrop-blur-sm border border-white/30
                               px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm 
                               font-medium hover:bg-white/30 transition-colors'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h1 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                             font-bold text-white mb-3 sm:mb-4 lg:mb-6 font-head 
                             leading-tight drop-shadow-lg'>
                  {story.title ? story.title.replace(/^"|"$/g, "") : "No Title"}
                </h1>

                <div className='flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-white/90 text-xs sm:text-sm'>
                  <div className='flex items-center bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2'>
                    <User size={14} className='mr-1.5 sm:mr-2 flex-shrink-0' />
                    <span className='truncate max-w-[100px] sm:max-w-none font-head'>{story.userId?.fullName}</span>
                  </div>
                  <div className='flex items-center bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2'>
                    <Calendar size={14} className='mr-1.5 sm:mr-2 flex-shrink-0' />
                    <span className='whitespace-nowrap'>{new Date(story.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className='flex items-center bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2'>
                    <Clock size={14} className='mr-1.5 sm:mr-2 flex-shrink-0' />
                    <span>10 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 overflow-hidden'>
        <div className='max-w-4xl mx-auto w-full'>
          
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between 
                         gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl lg:text-2xl text-gray-800 font-bold font-small 
                          leading-tight order-2 sm:order-1 break-words overflow-hidden'>
              {story.title ? story.title.replace(/^"|"$/g, "") : "No Title"}
            </h2>

            <div className='flex items-center gap-3 sm:gap-4 order-1 sm:order-2'>
              <button
                onClick={() => handleFavourite(id)}
                disabled={updating === id}
                className='flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 
                         rounded-full bg-gradient-to-r from-red-50 to-pink-50
                         backdrop-blur-md border border-red-200/50 shadow-sm 
                         active:scale-95 group/heart disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50
                         hover:from-red-100 hover:to-pink-100'
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/heart:scale-110 ${
                    story.likes.map(String).includes(String(user?._id))
                      ? "fill-red-500 text-red-500 drop-shadow-sm"
                      : "fill-gray-100 text-gray-400 stroke-red-400 stroke-2"
                  }`}
                />
                <span className='text-sm sm:text-base font-semibold text-gray-700'>
                  {story.likes.length}
                </span>
              </button>

              <button className='flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 
                               rounded-full border border-gray-200 text-gray-600 
                               hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50
                               transition-all duration-300 hover:shadow-sm active:scale-95'>
                <Share2 size={14} className='sm:w-4 sm:h-4' />
                <span className='text-sm sm:text-base font-medium'>Share</span>
              </button>
            </div>
          </div>

          <div
            className='prose prose-sm sm:prose-base lg:prose-lg w-full max-w-full font-titles
                       prose-headings:text-gray-800 prose-headings:font-bold
                       prose-p:text-gray-700 prose-p:leading-relaxed prose-p:break-words
                       prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:break-words
                       prose-strong:text-gray-800 prose-em:text-gray-600
                       prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50/50
                       prose-blockquote:rounded-r-lg prose-blockquote:py-2
                       prose-pre:overflow-x-auto prose-pre:max-w-full
                       prose-code:break-words prose-table:overflow-x-auto
                       overflow-wrap-anywhere break-words'
            dangerouslySetInnerHTML={{
              __html: story.story.replace(/^"|"$/g, ""),
            }}
            style={{
              lineHeight: "1.8",
              fontSize: "16px",
              color: "#374151",
              wordWrap: "break-word",
              overflowWrap: "anywhere",
              maxWidth: "100%",
            }}
          />

          <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200'>
            <div className='bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-4 sm:p-6 
                           border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='flex items-start sm:items-center gap-4'>
                <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br
                               rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl
                               shadow-md flex-shrink-0 bg-black'>
                  {story.userId?.fullName?.charAt(0).toUpperCase()}
                </div>
                
                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 truncate'>
                    {story.userId?.fullName}
                  </h3>
                  <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                    Follow me on social media for more amazing stories and updates
                  </p>
                  
                  <div className='flex gap-2 mt-3'>
                    
                  </div>
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