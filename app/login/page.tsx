"use client";

export default function Register() {
  async function onSubmit() {
    const response = await fetch(
      "http://localhost:3000/api/auth/authorize?responseType=code&clientId=" +
        process.env.NEXT_PUBLIC_CLIENT_ID +
        "&redirectUri=http://localhost:3000/cb&scope=full&state=xyz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic YzY3NGVkODQtYTAwMS00NmE1LWJkYzEtZmViYjNhY2VkODJkOjBkNGVlMTlhLWRiNGItNGUzMy04MjZkLWQ5NjdkYTBkYTZjMA==",
        },
        redirect: "follow",
      }
    )
      .then((res) => {
        window.location = res.url;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <button onClick={onSubmit}>Authorize</button>
    </div>
  );
}
