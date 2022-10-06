export async function getUserPicture(pseudo) {
  const rootPictureEndPoint = "https://avatars.dicebear.com/api/micah/";
  //const nameUser = `${pseudo}`;
  const nameUser = "lucie";

  //console.log(pseudo);
  //console.log(nameUser);
  //console.log(`${rootPictureEndPoint}/${namePlayers}?api_token=${apiKey}`)
  let response = await fetch(
    `https://avatars.dicebear.com/api/micah/lucie.svg`
  );
  console.log("response : ", response);
  let dataR = await response.text();
  //console.log(dataR);
  const imagePath = "https://avatars.dicebear.com/api/micah/lucie.svg";
  return imagePath;
}
