export type RegisterClientRequest = {
  redirectionURIs: Array<String>;
  applicationName: String;
  website: String;
  description: String;
  acceptanceOfLegalTerms: Boolean;
  grantType: String;
  scopes: Array<String>;
};
