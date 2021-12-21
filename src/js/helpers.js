export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export async function getJSON(url){
    try{
        const res = await Promise.race([fetch(url), timeout(10)]);
        const data = await res.json();

        if(!res.ok) throw new Error(`Wrong URL Id - ${res.status}`);

        return data;
    }
    catch(err){
        throw err;
    }
}

