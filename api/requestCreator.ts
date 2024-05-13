export const apiRequest = async (query: string, method: string, body: any = {}, auth: boolean = false) => {
  let options: any = {
    method: method,
    cache: "no-cache",
    headers: {}
  };

  if (auth) {
    options.headers["AuthToken"] = localStorage.getItem("token");
  }

  if (method != "get" && method != "delete") {
    const formData = new FormData();

    for (let field in body) {
      formData.set(field, body[field]);
    }

    options["body"] = formData;
  }

  let url = `${location.hostname}:8080/api${query}`;
  url = url.replaceAll("//", "/");
  url = "http://" + url;

  const response = await fetch(url, options);

  return {
    body: await response.json(),
    status: response.status,
  }
}