const host="cmsv6.co.uk";
const publicKey="0e167d47b5200125e1c2ac8734b07c09";
const key=process.env.INDEXNOW_KEY||publicKey;
const urls=process.argv.slice(2).map(value=>new URL(value.startsWith("http")?value:`https://${host}${value.startsWith("/")?value:`/${value}`}`));

if(!urls.length){
  console.error("Provide one or more genuinely changed CMSV6 paths or canonical URLs.");
  process.exitCode=1;
}else if(urls.some(url=>url.protocol!=="https:"||url.hostname!==host)){
  console.error("Every submitted URL must use the canonical https://cmsv6.co.uk host.");
  process.exitCode=1;
}else{
  const response=await fetch("https://api.indexnow.org/indexnow",{
    method:"POST",
    headers:{"Content-Type":"application/json; charset=utf-8"},
    body:JSON.stringify({host,key,keyLocation:`https://${host}/${key}.txt`,urlList:urls.map(url=>url.href)}),
  });
  console.log(JSON.stringify({event:"indexnow_submission",status:response.status,urlCount:urls.length,accepted:response.status===200||response.status===202}));
  if(!response.ok&&response.status!==202) process.exitCode=1;
}
