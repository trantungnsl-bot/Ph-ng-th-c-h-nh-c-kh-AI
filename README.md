# Phòng thực hành cơ khí thông minh – AI Vision

## Chức năng
- Camera hoặc tải ảnh sản phẩm lên.
- Gửi ảnh đến OpenAI Responses API để phân tích hình ảnh.
- Trả về nhận diện, cấu tạo quan sát được, vật liệu dự đoán, dụng cụ, quy trình gia công, tiêu chí kiểm tra và an toàn.

## Chạy thử trên máy tính
Yêu cầu Node.js 20+ và một OpenAI API key có quyền sử dụng API.

1. Giải nén thư mục.
2. Mở terminal tại thư mục dự án.
3. Cài thư viện:
   `npm install`
4. Thiết lập API key (không ghi key vào mã nguồn):
   - Windows PowerShell: `$env:OPENAI_API_KEY="YOUR_API_KEY"`
   - macOS/Linux: `export OPENAI_API_KEY="YOUR_API_KEY"`
5. Chạy:
   `npm start`
6. Mở `http://localhost:3000`.

## Cấu hình
- `OPENAI_API_KEY`: bắt buộc, chỉ đặt ở máy chủ.
- `OPENAI_VISION_MODEL`: tùy chọn, mặc định `gpt-4.1`.

## Triển khai
Đưa toàn bộ dự án lên máy chủ Node.js có HTTPS. Thiết lập `OPENAI_API_KEY` trong phần biến môi trường/secret của máy chủ. Không đưa API key vào HTML, JavaScript phía trình duyệt, tệp tải xuống hoặc kho mã công khai.

## Lưu ý
- Bản này đã có đường kết nối API thật, nhưng chỉ hoạt động khi cài dependencies, cấu hình API key và chạy backend.
- Phân tích ảnh là gợi ý, có thể sai; cần giáo viên xác minh vật liệu, kích thước, bản vẽ và quy trình.
- Camera cần HTTPS khi triển khai công khai; localhost được trình duyệt cho phép trong môi trường phát triển.


## Đưa website lên Internet bằng Render

Gói đã có `render.yaml` để Render nhận cấu hình dịch vụ Node.js.

1. Tạo tài khoản Render và GitHub.
2. Giải nén ZIP, đưa toàn bộ nội dung thư mục dự án lên một GitHub repository riêng tư.
3. Trong Render, chọn **New → Blueprint** và kết nối repository đó.
4. Render đọc `render.yaml`; xác nhận tạo Web Service.
5. Khi Render yêu cầu biến môi trường, nhập `OPENAI_API_KEY` trực tiếp trong phần Environment của dịch vụ. Không gửi key qua chat và không commit key vào GitHub.
6. Chờ quá trình deploy hoàn tất, mở URL `https://...onrender.com` do Render cấp.
7. Mở bằng điện thoại, cho phép quyền camera và thử quét ảnh.

Lưu ý:
- Gói hiện tại đã chuẩn bị cấu hình triển khai, nhưng chưa được xuất bản lên Internet vì cần người dùng đăng nhập và cấp quyền cho tài khoản GitHub/Render cũng như tự nhập API key.
- Gói miễn phí của nền tảng hosting có thể ngủ khi không sử dụng và có giới hạn tài nguyên; thời gian khởi động lại có thể chậm.
- Chi phí API AI được tính riêng theo tài khoản OpenAI API. ChatGPT subscription không tự động bao gồm chi phí API.
- Nên dùng repository riêng tư, giới hạn quyền truy cập và theo dõi mức sử dụng API.
