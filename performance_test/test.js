import http from "k6/http";

const BaseUrl = "http://localhost:8000/api/v1/";

function get_album(GetAccesskey) {
  const url = `${BaseUrl}album/`;
  const params = {
    headers: {
      Authorization: `Bearer ${GetAccesskey}`,
    },
  };
  const response = http.get(url, params);
  if (response.status === 200) {
    console.log("Album success! Response:", response.body);
  } else {
    console.log("Album Error! status:", response.status);
  }
}

function post_logout(GetAccesskey, refresh) {
  const url = `${BaseUrl}logout/`;
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
    console.log("Logout success! Response:", response.body);
  } else {
    console.log("Logout Error! status:", response.status);
  }
}

export default function () {
  const url = `${BaseUrl}login/`;
  const payload = JSON.stringify({
    email: "asdf@gmail.com",
    password: "asdf",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = http.post(url, payload, params);
  if (response.status === 200) {
    console.log("Login Success! Response:", response.body);
    const GetAccesskey = JSON.parse(response.body).access;
    const GetRefresh = JSON.parse(response.body).refresh;
    get_album(GetAccesskey);
    post_logout(GetAccesskey, GetRefresh);
  } else {
    console.log("Login Error! status:", response.status);
  }
}
