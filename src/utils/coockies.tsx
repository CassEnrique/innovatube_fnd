'use client'

export const getCookies = () => Object.fromEntries(document.cookie.split('; ').map(item => item.split('=')));

export const dropCookies = (cookie: string): void => {
  document.cookie = `${cookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
};

const _ = {
  getCookies,
  dropCookies,
}

export default _;
