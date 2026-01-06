
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Always use process.env.API_KEY directly when initializing as per SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (userQuery: string, currentCart?: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `Bạn là một trợ lý mua sắm công nghệ cao cấp tại TechStore AI. 
          Dựa trên yêu cầu của khách hàng: "${userQuery}". 
          Và các sản phẩm đang có trong giỏ hàng: ${currentCart?.join(", ") || "Trống"}.
          Hãy đưa ra 3 gợi ý sản phẩm phù hợp nhất kèm theo lý do tại sao chúng lại phù hợp (tối đa 2 câu mỗi sản phẩm). 
          Phong cách trả lời: Chuyên nghiệp, hiện đại, tin cậy.`
        }]
      }]
    });
    // Accessing .text property directly as per GenerateContentResponse guidelines
    return response.text || "Xin lỗi, tôi không thể đưa ra gợi ý lúc này.";
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return "Chúng tôi đang gặp sự cố với AI, vui lòng thử lại sau.";
  }
};

export const analyzeProductSpec = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        parts: [{
          text: `Phân tích ưu nhược điểm và đối tượng sử dụng phù hợp cho sản phẩm: ${productName}. Trả lời ngắn gọn bằng các gạch đầu dòng.`
        }]
      }]
    });
    // Accessing .text property directly as per GenerateContentResponse guidelines
    return response.text || "";
  } catch (error) {
    return "Không có dữ liệu phân tích.";
  }
};
