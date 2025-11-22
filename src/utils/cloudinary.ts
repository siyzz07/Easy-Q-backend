import cloudinary from "../config/cloudinaryConfig";

export const deleteCloudinaryImage = async (public_id: string) => {
  try {
    if (!public_id) return false;

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result == "ok") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
