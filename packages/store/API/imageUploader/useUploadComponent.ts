import { useState } from "react";
import {
  useUploadImageMutation,
  useLazyGetImageQuery,
  ImageDetails,
} from "./imageUploader";

interface UploadOptions {
  file: File;
  isProfilePicture?: boolean;
}

interface UseUploadComponentReturn {
  uploadAndGetImage: (
    options: UploadOptions
  ) => Promise<ImageDetails | undefined>;
  isLoading: boolean;
  error?: string | undefined;
}

export const useUploadComponent = (): UseUploadComponentReturn => {
  const [uploadImage] = useUploadImageMutation();
  const [getImage] = useLazyGetImageQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const uploadAndGetImage = async (
    options: UploadOptions
  ): Promise<ImageDetails | undefined> => {
    try {
      setIsLoading(true);
      setError(undefined);

      const formData = new FormData();
      formData.append("ImageFile", options.file);
      formData.append(
        "IsProfilePicture",
        options.isProfilePicture ? "true" : "false"
      );

      const uploadResult = await uploadImage(formData).unwrap();
      const { data: imageDetails } = await getImage(uploadResult.id);

      return imageDetails;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadAndGetImage,
    isLoading,
    error,
  };
};
