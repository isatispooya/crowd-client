export function setCookie(cname, cvalue, exdays, isHostPrefix = false) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 15 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  let cookieName = cname;
  const isHttps = window.location.protocol === 'https:';
  if (isHostPrefix && isHttps) {
    cookieName = `__Host-${cname}`;
  } else if (isHttps) {
    cookieName = `__Secure-${cname}`;
  }

  const secureFlag = isHttps ? ';Secure' : '';
  // const sameSiteFlag = isHttps ? ';SameSite=None' : ';SameSite=Lax';
  const sameSiteFlag = ';SameSite=Lax';
  const pathFlag = ';Path=/';

  document.cookie = `${cookieName}=${cvalue};${expires}${pathFlag}${secureFlag}${sameSiteFlag}`;
}


export function getCookie(cname, isHostPrefix = false) {
  const isHttps = window.location.protocol === 'https:';
  let cookieName = cname;

  if (isHostPrefix && isHttps) {
    cookieName = `__Host-${cname}`;
  } else if (isHttps) {
    cookieName = `__Secure-${cname}`;
  }

  const name = `${cookieName}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
