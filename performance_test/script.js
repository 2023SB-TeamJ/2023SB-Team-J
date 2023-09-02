import http from "k6/http";
import { sleep, check } from "k6";
import { Trend } from "k6/metrics";
import { FormData } from "https://jslib.k6.io/formdata/0.0.1/index.js"; // Import FormData library

export const options = {
  vus: 1,
  duration: "20s",
};
let access; // Declare the access variable at the function scope

function get_album(GetAccesskey) {
  const url = "http://localhost:8000/api/v1/album/";
  const params = {
    headers: {
      Authorization: `Bearer ${GetAccesskey}`,
      "Content-Type": "application/json",
    },
  };
  const response = http.post(url, null, params);
  if (response.status === 200) {
    console.log("Album success! Response:");
  } else {
    console.log("Album Error! status:", response.status);
  }
}

function post_logout(GetAccesskey, refresh) {
  const url = "http://localhost:8000/api/v1/logout/";
  const params = {
    headers: {
      Authorization: `Bearer ${GetAccesskey}`,
      "Content-Type": "application/json",
    },
  };
  const payload = JSON.stringify({
    refresh: refresh,
  });
  const response = http.post(url, payload, params);
  if (response.status === 200) {
    console.log("Logout success! Response:");
  } else {
    console.log("Logout Error! status:", response.status);
  }
}

const img1 = open("./images/조훈-1.jpg", "b");
const img2 = open("./images/청서.jpeg", "b");
const img3 = open("./images/카호.jpeg", "b");
const img4 = open("./images/test.jpg", "b");

function get_upload(GetAccesskey) {
  const apiUrl = "http://localhost:8000/api/v1/frame/"; // 실행할 API URL
  const fd = new FormData();

  // Check if img1, img2, img3, and img4 are loaded correctly
  if (img1 && img2 && img3 && img4) {
    fd.append("image", http.file(img1, "조훈-1.jpg", "image/jpeg"));
    fd.append("image", http.file(img2, "청서.jpeg", "image/jpeg"));
    fd.append("image", http.file(img3, "카호.jpeg", "image/jpeg"));
    fd.append("image", http.file(img4, "test.jpg", "image/jpeg"));

    const params = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=" + fd.boundary,
        Authorization: `Bearer ${GetAccesskey}`,
      },
    };

    // Make the POST request with the FormData object
    const response = http.post(apiUrl, fd.body(), params);
    if (response.status === 201) {
      console.log("upload success! Response:");
    } else {
      console.log("upload Error! status:", response.status);
    }
  } else {
    console.error("Image files not loaded correctly");
  }
}

function get_frame(GetAccesskey) {
  const apiUrl = "http://localhost:8000/api/v1/frame/"; // 실행할 API URL

  // Create a FormData object
  const fd = new FormData();

  // Append the images to the FormData object
  fd.append("image", img1);
  fd.append("image", img2);
  fd.append("image", img3);
  fd.append("image", img4);
  // // Append the images to the FormData object
  // fd.append("images", http.file(img1, "조훈-1.jpg", "image/jpeg"));
  // fd.append("images", http.file(img2, "청서.jpeg", "image/jpeg"));
  // fd.append("images", http.file(img3, "카호.jpeg", "image/jpeg"));
  // fd.append("images", http.file(img4, "test.jpg", "image/jpeg"));

  // Make the POST request with the FormData object
  const res = http.post(apiUrl, fd.body(), {
    headers: {
      Authorization: `Bearer ${GetAccesskey}`,
      "Content-Type": "multipart/form-data; boundary=" + fd.boundary,
    },
  });
  // Log the result
  if (res.status === 200) {
    console.log("converting success! Response:");
  } else {
    console.log("converting fail! Response:", res.status);
  }
}

export default function () {
  const url = "http://localhost:8000/api/v1/login/"; // token 취득
  const payload = {
    email: "hello@naver.com",
    password: "hello",
  };
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, JSON.stringify(payload), params);
  if (response.status == 200) {
    // console.log("Login Success! Response:", response.body);
    access = JSON.parse(response.body).access; // Assign the value here
    // const access = JSON.parse(response.body).access;
    const refresh = JSON.parse(response.body).refresh;

    get_album(access);

    const upload_response = get_upload(access);
    console.log(upload_response.body);

    post_logout(access, refresh);
    sleep(1);
  } else {
    console.log("Login Error! status:", response.status);
  }

  return access; // 객체의 속성명을 명시적으로 설정
}
