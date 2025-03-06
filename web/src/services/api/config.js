export const baseUrl = "/api";

export const uploadPhoto= async (photo)=>{
    const formData = new FormData();
    formData.append("file", photo);
  
   const res = await fetch(`${baseUrl}/upload`, {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    return data.url;
  }

export const getUserData=(userId)=>{
    fetch(`${baseUrl}/users/${userId}`)
    .then((res)=>res.json())
    .then((data)=> data)
}