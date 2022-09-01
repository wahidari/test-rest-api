import Router from "next/router";
import nookies from "nookies";

export default function Logout() {
  nookies.destroy(null, "token");
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'token=; path=/edit; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  Router.replace("/login");
}