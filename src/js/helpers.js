export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  

/**
 * @param {string} a url link which we wanna fetch
 */
export async function AJAX(url , uploadData = null){
  try{
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);

    const res = await Promise.race([fetchPro, timeout(10)]);
    const data = await res.json();

    if(!res.ok) throw new Error(`Wrong URL Id - ${res.status}`);

    return data;

  }catch(err){
    throw err;
  }
}



