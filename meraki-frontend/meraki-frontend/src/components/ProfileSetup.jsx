import React, { useState } from "react";

const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "volunteer", // Default role
    bio: "",
    profileImage: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProfile((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted: ", profile);
    // Implement API call to save profile data
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-soft-white rounded-2xl shadow-lg border border-muted-gray">
      <h2 className="text-2xl font-bold text-teal mb-4">Set Up Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-cobalt-blue font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-cobalt-blue font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-cobalt-blue font-medium mb-1">Role</label>
          <select
            name="role"
            value={profile.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
            <option value="voter">Voter</option>
          </select>
        </div>

        {/* Bio Field */}
        <div>
          <label className="block text-cobalt-blue font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
            rows="4"
            placeholder="Tell us something about yourself"
          ></textarea>
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block text-cobalt-blue font-medium mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cobalt-blue file:text-soft-white hover:file:bg-plum"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 w-32 h-32 rounded-full object-cover border border-muted-gray"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal text-soft-white py-2 px-4 rounded-lg font-semibold hover:bg-lush-green transition-all"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
