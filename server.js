import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "12mb" }));
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/analyze", async (req, res) => {
  try {
    const { image } = req.body ?? {};
    if (typeof image !== "string" || !/^data:image\/(png|jpe?g|webp);base64,/.test(image)) {
      return res.status(400).json({ error: "Ảnh không hợp lệ. Hãy tải PNG, JPG hoặc WEBP." });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_VISION_MODEL || "gpt-4.1",
      input: [{
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Bạn là trợ lý giáo dục Công nghệ cơ khí cho học sinh THPT tại Việt Nam.
Hãy quan sát ảnh sản phẩm và trả lời bằng tiếng Việt theo các mục:
1. Nhận diện: tên/nhóm sản phẩm; nêu mức độ chắc chắn và các dấu hiệu nhìn thấy.
2. Mô tả cấu tạo: chỉ nêu chi tiết quan sát được; phân biệt rõ phần suy đoán.
3. Vật liệu: chỉ đưa ra khả năng dự đoán từ ảnh, không khẳng định chắc chắn nếu không thể xác minh.
4. Công dụng và nguyên lý hoạt động dự kiến.
5. Dụng cụ, vật liệu cần chuẩn bị cho mô hình học tập.
6. Quy trình gia công đề xuất: chia thành các nguyên công tuần tự, nêu mục đích mỗi bước.
7. Điểm cần đo/kiểm tra chất lượng.
8. Lưu ý an toàn lao động.
Nếu ảnh không phải sản phẩm cơ khí hoặc quá mờ, hãy nói rõ và yêu cầu chụp lại. Không tự bịa kích thước, dung sai, mác vật liệu hoặc thông số máy. Không hướng dẫn học sinh tự vận hành máy nguy hiểm; yêu cầu giáo viên giám sát. Đây là gợi ý học tập, không thay thế bản vẽ và xác nhận của giáo viên.`
          },
          { type: "input_image", image_url: image, detail: "high" }
        ]
      }]
    });

    return res.json({ analysis: response.output_text || "Không đọc được kết quả từ mô hình." });
  } catch (error) {
    console.error("Vision API error:", error?.message || error);
    return res.status(500).json({ error: "Máy chủ chưa phân tích được ảnh. Kiểm tra API key, hạn mức và cấu hình mô hình." });
  }
});

app.listen(port, () => console.log(`Mechanical AI Vision running at http://localhost:${port}`));
