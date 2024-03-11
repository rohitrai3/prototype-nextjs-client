export async function GET() {
  let redirectUrl: string = "";

  await fetch(
    "http://localhost:8080/authorize?responseType=code&clientId=" +
      process.env.CLIENT_ID +
      "&redirectUri=http://localhost:3000/cb&scope=full&state=xyz",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
      },
      redirect: "manual",
    }
  )
    .then((res) => {
      console.log(res.headers.get("location"));
      redirectUrl = res.headers.get("location")!;
    })
    .catch((err) => {
      console.error(err);
    });

  return Response.redirect(redirectUrl);
}
