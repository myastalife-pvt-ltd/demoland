// India Pincode API utility
// Uses the free India Post API to get location details from pincode

export interface PincodeData {
  state: string;
  city: string;
  district: string;
  region: string;
  country: string;
}

export interface PincodeResponse {
  success: boolean;
  data?: PincodeData;
  error?: string;
}

/**
 * Fetches location details for an Indian pincode
 * Uses the India Post API (api.postalpincode.in)
 */
export async function getPincodeDetails(pincode: string): Promise<PincodeResponse> {
  // Validate pincode format (6 digits)
  if (!/^\d{6}$/.test(pincode)) {
    return {
      success: false,
      error: "Invalid pincode format. Must be 6 digits.",
    };
  }

  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to fetch pincode details",
      };
    }

    const data = await response.json();

    // API returns array with single object
    if (data && data[0]) {
      const result = data[0];
      
      if (result.Status === "Success" && result.PostOffice && result.PostOffice.length > 0) {
        const postOffice = result.PostOffice[0];
        
        return {
          success: true,
          data: {
            state: postOffice.State || "",
            city: postOffice.Block || postOffice.District || "",
            district: postOffice.District || "",
            region: postOffice.Region || "",
            country: postOffice.Country || "India",
          },
        };
      } else if (result.Status === "Error" || result.Status === "404") {
        return {
          success: false,
          error: "Pincode not found. Please enter a valid Indian pincode.",
        };
      }
    }

    return {
      success: false,
      error: "Unable to fetch location details",
    };
  } catch (error) {
    console.error("Pincode API error:", error);
    return {
      success: false,
      error: "Network error. Please check your connection.",
    };
  }
}
