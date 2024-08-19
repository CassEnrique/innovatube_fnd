const service: string | undefined = process.env.URI_API;
const version: string | undefined = process.env.URI_VER;
const youtube: string | undefined = process.env.KEY_YOUTUBE;

export async function get_videos(props: {
  type: string;
  params: any;
}): Promise<any> {
  const params: string = new URLSearchParams({
    ...props.params,
    key: youtube,
  }).toString();

  const res: Response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/${props.type}?${params}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    },
  );

  return await res.json();
}

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

export async function create_favorite(payload: object): Promise<any> {
  const res: Response = await fetch(`${service}${version}/favorite/create`, {
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

export async function delete_favorite(pk: string): Promise<any> {
  const res: Response = await fetch(`${service}${version}/favorite/delete/${pk}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "massive",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  return await res.json();
}
