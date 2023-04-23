#### 1. Hãy nêu các bước viết unit test

- Xác định tất cả các case có thể xảy ra

- Xác định các tham số và kết quả mong đợi cho từng case

- Viết Unit test

- Chạy các test case đã viết

- Xem xét và đánh giá kết quả 
  - check các case pas/fail
  - chạy lệnh report -> kiểm tra độ phủ của testcase đã đúng kì vọng hay chưa

#### 2. Các thành phần cơ bản có trong 1 unit test:

- Test suit

- Block test

- Test case

- Action (các action để ra kết qủa: mock data,...)

- Assert

#### 3. Liệt kê tất cả các test cases mà bạn có thể nghĩ ra để kiểm tra 1 mảng có phải là mảng số tăng dần hay không?

- Mảng rỗng: [] -> false

- Mảng 1 phần tử: [1] -> false

- Mảng có chứa ít nhất 1 item string: [1, '2'] -> false

- Mảng chứa ít nhất 1 item null: [null, 2] -> false

- Mảng chứa ít nhất 1 item undifined: [undefined, 2] -> false

- Mảng các phần tử giống nhau: [1, 1, 1, 1] -> false

- Mảng số và các item có giá trị bất kì: [1, 2, 5, 4] -> false

- Mảng giảm dần: [20, 15, 12, 5] -> false

- Mảng tăng dần có item trùng nhau : [2, 4, 4, 7, 9] -> true

- Mảng tăng dần: [2, 4, 6, 9, 23] -> true

- Mảng tăng dần có số thực: [2, 4, 6.3, 9, 23] -> true
