"use client";

export const getCookies = () =>
  Object.fromEntries(
    document.cookie.split("; ").map((item) => item.split("=")),
  );

export const dropCookies = (cookie: string): void => {
  document.cookie = `${cookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const setCookies = (name: string, token: string): void => {
  var now: Date = new Date();
  var time: number = now.getTime();
  var expireTime: number = time + 1000 * 36000;
  now.setTime(expireTime);

  document.cookie = `${name}=${token};expires=${now.toUTCString()};path=/;samesite=lax;secure=true;`;
};

const _ = {
  getCookies,
  dropCookies,
  setCookies,
};

export default _;
