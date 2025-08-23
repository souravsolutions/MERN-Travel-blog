import { useState } from "react";
import { Upload, X, Calendar, MapPin, Tag } from "lucide-react";
import ApiClient from "../service/apiClient";
import { toast } from "sonner";

export default function TravelUploadComponent({
  onUploadSuccess,
  editData,
  onClose,
}) {
  const [formData, setFormData] = useState({
    title: editData?.title || "",
    story: editData?.story || "",
    visitedLocation: editData?.visitedLocation || "",
    visitedDate: editData?.visitedDate || "",
    tags: editData?.tags || [],
  });

  const [uploadedImage, setUploadedImage] = useState(
    editData?.imageUrl || null
  );
  const [imageFile, setImageFile] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("story", formData.story);
      data.append("visitedLocation", formData.visitedLocation);
      data.append("visitedDate", formData.visitedDate);
      data.append("tags", JSON.stringify(formData.tags));

      if (imageFile) data.append("image", imageFile);

      let res;
      if (editData) {
        res = await ApiClient.editStory(editData._id, data);
      } else {
        res = await ApiClient.uploadStory(data);
      }

      toast.success(
        editData ? "Story updated successfully" : "Story uploaded successfully"
      );

      if (onUploadSuccess) onUploadSuccess();
      if (onClose) onClose(); // close popup after submit
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center'>
          {editData ? "Edit Travel Memory" : "Share Your Travel Memory"}
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Image Upload */}
          <div className='space-y-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Upload Image
            </label>

            {!uploadedImage ? (
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors ${
                  isDragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileInput}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  required
                />
                <Upload className='mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4' />
                <p className='text-sm text-gray-600'>
                  Drop your image here or{" "}
                  <span className='text-blue-600 font-medium'>browse</span>
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className='relative'>
                <img
                  src={uploadedImage}
                  alt='Uploaded'
                  className='w-full h-40 sm:h-48 object-cover rounded-lg'
                />
                <button
                  type='button'
                  onClick={removeImage}
                  className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Title
            </label>
            <input
              type='text'
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder='Enter a memorable title...'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Story */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Your Story
            </label>
            <textarea
              value={formData.story}
              onChange={(e) => handleInputChange("story", e.target.value)}
              placeholder='Tell us about your adventure...'
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <MapPin className='inline h-4 w-4 mr-1' />
              Visited Location
            </label>
            <input
              type='text'
              value={formData.visitedLocation}
              onChange={(e) =>
                handleInputChange("visitedLocation", e.target.value)
              }
              placeholder='Where did you go?'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Calendar className='inline h-4 w-4 mr-1' />
              Visited Date
            </label>
            <input
              type='date'
              value={formData.visitedDate}
              onChange={(e) => handleInputChange("visitedDate", e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Tag className='inline h-4 w-4 mr-1' />
              Tags
            </label>
            <div className='flex flex-wrap gap-2 mb-2'>
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                >
                  {tag}
                  <button
                    type='button'
                    onClick={() => removeTag(tag)}
                    className='ml-2 hover:text-blue-600'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </span>
              ))}
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <input
                type='text'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Add a tag...'
                className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                type='button'
                onClick={addTag}
                className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors'
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting
              ? editData
                ? "Updating..."
                : "Uploading..."
              : editData
              ? "Update Travel Memory"
              : "Save Travel Memory"}
          </button>
        </form>
      </div>
    </div>
  );
}
