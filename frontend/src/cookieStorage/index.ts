import Cookies from 'js-cookie'

const sessionCookie = Cookies.get('sessionid');
const csrftokenCookie = Cookies.get('csrftoken');

export { sessionCookie, csrftokenCookie }
