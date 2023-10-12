// REQUEST WITH TOKEN

async function doFetch(url, method = `GET`) {
  try {
    console.log(url);
    const token = (localStorage.getItem("token"));
    console.log(token);
    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token};
        ,
        ;
      }`,
      },
    };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;


doFetch(postsUrl);
