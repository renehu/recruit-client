export function getRedirectUrl(type, avatar) {
  let url;

  if (type === "employee") {
    url = "/employee";
  } else if (type === "employer") {
    url = "/employer";
  }

  if (!avatar) {
    url += "-info";
  }

  return url;
}
