export async function request(url, method, body) {
    try {
      let response = await fetch(url,{
      	method,
      	body
      });
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }
