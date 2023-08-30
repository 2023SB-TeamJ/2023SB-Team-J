import http from "k6/http";
import { sleep, check } from "k6";
import { Trend } from "k6/metrics";
import { FormData } from "https://jslib.k6.io/formdata/0.0.1/index.js"; // Import FormData library

export const options = {
  vus: 1,
  duration: "10s",
};

export function setup() {
  const url = "http://localhost:8000/api/v1/login/"; // token 취득
  const payload = {
    email: "hello@naver.com",
    password: "hello",
  };
  const headers = {
    "Content-Type": "application/json",
  };

  const res = http.post(url, JSON.stringify(payload), { headers: headers });
  const token = res.data.access;

  return token; // 객체의 속성명을 명시적으로 설정
}

export default function (token) {
  const apiUrl = "http://localhost:8000/api/v1/frame/"; // 실행할 API URL

  // 이미지 데이터와 관련된 정보
  const imageFiles = [
    "https://media.discordapp.net/attachments/830732106207592488/1143191743366438912/20230406_014344.jpg",
    "https://media.discordapp.net/attachments/830732106207592488/1143191743664226355/20230818_091454.jpg",
    "https://media.discordapp.net/attachments/830732106207592488/1137406484603474040/20230806_001906.jpg",
    "https://media.discordapp.net/attachments/830732106207592488/1129443324906979368/20230715_003605.jpg",
  ];
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNDY0NDM5LCJpYXQiOjE2OTMzNzgwMzksImp0aSI6IjY4NzFmMmI0MGFkOTQyZWU4MjE1YWU4OGFiZjIwNWQwIiwidXNlcl9pZCI6MX0.KmV8-YnbWlLz2psW8cZ0aFyn8DHn_tC6_nyDHxgwMGw";

  // 시나리오 시작
  const access = token;
  const scenarioTrend = new Trend("scenario-ai-converting Response time", true);

  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const formData = new FormData(); // Create a FormData object
    formData.append("image", http.file(imageFile), {
      contentType: "image/jpeg",
    }); // Append the image file with content type

    const headers = {
      Authorization: `Bearer ${access}`,
    };

    // 이미지 업로드 시나리오 시작
    const scenario = http.post(apiUrl, formData.body(), { headers: headers });

    // 시나리오 데이터 수집
    scenarioTrend.add(scenario.timings.duration);

    // 응답 확인
    check(scenario, {
      "scenario status is 200": (res) => res.status === 200,
    });

    sleep(1); // 시나리오 간 간격
  }
}
