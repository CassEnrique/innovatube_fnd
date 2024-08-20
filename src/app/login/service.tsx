const service: string | undefined = process.env.URI_API;
const version: string | undefined = process.env.URI_VER;
const youtube: string | undefined = process.env.KEY_YOUTUBE;

export async function get_catalog(props: { module: string }): Promise<any> {
  const route: string = "/get/all";
  const { module }: { module: string } = props;

  const res: Response = await fetch(`${service}${version}/${module}${route}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      // 'Authorization': `Bearer ${getCookies().jwtAuth}`,
      "Content-Type": "application/json",
      "User-Agent": "massive",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  return await res.json();
}

export async function login(payload: object): Promise<any> {
  const res: Response = await fetch(`${service}${version}/login/user`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "massive",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  });

  return await res.json();
}
