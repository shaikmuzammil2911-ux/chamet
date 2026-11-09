export interface CloudinaryUploadResponse {
  asset_id?: string;
  public_id: string;
  version?: number;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  created_at?: string;
  bytes?: number;
  type?: string;
  url?: string;
  secure_url: string;
}

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "nvzawyfd",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default",
};

/**
 * Upload a file directly to Cloudinary using unsigned upload preset
 */
export async function uploadToCloudinary(
  file: File | Blob | string,
  folder: string = "manaverse"
): Promise<{ secure_url: string; public_id: string; error?: string }> {
  try {
    const formData = new FormData();

    if (typeof file === "string") {
      formData.append("file", file);
    } else {
      formData.append("file", file);
    }

    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
    formData.append("folder", folder);

    const resourceType =
      typeof file !== "string" && file.type && file.type.startsWith("video")
        ? "video"
        : "image";

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.warn("Cloudinary upload returned error:", data?.error?.message);
      // Fallback: If preset needs unsigned whitelisting, return an informative error
      return {
        secure_url: "",
        public_id: "",
        error:
          data?.error?.message ||
          "Upload failed. Ensure upload preset is configured as Unsigned in Cloudinary settings.",
      };
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (err: any) {
    console.error("Cloudinary upload exception:", err);
    return {
      secure_url: "",
      public_id: "",
      error: err.message || "Network error during media upload.",
    };
  }
}
