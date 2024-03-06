"use client";

import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";

export default function CallBack() {
  const searchParams = useSearchParams();

  async function onSubmit() {
    const code: String = searchParams.get("code")!;

    const response = await fetch(
      "http://localhost:3000/api/auth/token?grantType=code&code=" +
        code +
        "&redirectUri=http://localhost:3000/cb&clientId=" +
        process.env.NEXT_PUBLIC_CLIENT_ID,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic YzY3NGVkODQtYTAwMS00NmE1LWJkYzEtZmViYjNhY2VkODJkOjBkNGVlMTlhLWRiNGItNGUzMy04MjZkLWQ5NjdkYTBkYTZjMA==",
        },
        redirect: "follow",
      }
    );

    const responseData = await response.json();

    localStorage.setItem("token", responseData.accessToken);
  }

  return (
    <div>
      <h1>Authorized</h1>
      <button onClick={onSubmit}>Get Token</button>
      <br />
      <a href="/hello">Hello</a>
    </div>
  );
}
