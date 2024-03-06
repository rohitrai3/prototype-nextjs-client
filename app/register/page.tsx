"use client";

import { FormEvent, useState } from "react";
import { RegisterClientRequest } from "../types";

export default function Register() {
  const [clientId, setClientId] = useState<String>();
  const [clientSecret, setClientSecret] = useState<String>();
  const [isRegistrationSuccessfull, setIsRegistratinoSuccessfull] =
    useState<Boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData: FormData = new FormData(event.currentTarget);
    const data: RegisterClientRequest = {
      redirectionURIs: [formData.get("redirectionURIs")?.toString()!],
      applicationName: formData.get("applicationName")?.toString()!,
      website: formData.get("webiste")?.toString()!,
      description: formData.get("description")?.toString()!,
      acceptanceOfLegalTerms:
        formData.get("acceptanceOfLegalTerms")?.toString()! === "accept",
      grantType: formData.get("grantType")?.toString()!,
      scopes: [formData.get("scopes")?.toString()!],
    };

    const response = await fetch("http://localhost:8080/client/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    setClientId(responseData.clientId);
    setClientSecret(responseData.clientSecret);
    setIsRegistratinoSuccessfull(true);
  }

  const getVisibility = () => {
    return isRegistrationSuccessfull ? "block" : "hidden";
  };

  return (
    <div>
      <form className="flex flex-col w-1/2" onSubmit={onSubmit}>
        <label>Redirection URIs</label>
        <input
          className="bg-gray-500"
          type="text"
          value="http://localhost:3000/cb"
          name="redirectionURIs"
        />
        <label>Application Name</label>
        <input className="bg-gray-500" type="text" value="Demo NextJS Client" />
        <label>Website</label>
        <input
          className="bg-gray-500"
          type="text"
          value="http://localhost:3000"
          name="website"
        />
        <label>Description</label>
        <input
          className="bg-gray-500"
          type="text"
          value="This is a demo app"
          name="description"
        />
        <label>Acceptance of Legal Terms</label>
        <div>
          <input
            className="bg-gray-500"
            type="radio"
            value="accept"
            name="acceptanceOfLegalTerms"
            checked
          />
          <label>Accept</label>
          <input
            className="bg-gray-500"
            type="radio"
            value="deny"
            name="acceptanceOfLegalTerms"
          />
          <label>Deny</label>
        </div>
        <label>Grant Type</label>
        <select className="bg-gray-500" name="grantType">
          <option value="code" selected>
            Authorization Code
          </option>
        </select>
        <label>Scopes</label>
        <div>
          <input
            className="bg-gray-500"
            type="checkbox"
            value="full"
            name="scopes"
            checked
          />
          <label>Full</label>
        </div>
        <input className="bg-gray-500" type="submit" value="Register" />
      </form>
      <div className={getVisibility()}>
        <label>Client Id</label> :<span>{clientId}</span>
        <br />
        <label>Client Secret</label> :<span>{clientSecret}</span>
      </div>
    </div>
  );
}
