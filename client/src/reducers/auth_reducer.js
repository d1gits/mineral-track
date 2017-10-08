import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  ADD_COMPANY,
  FETCH_MESSAGE,
  FETCH_ADMIN_MESSAGE,
  SET_ADMIN_PRIVILEGES
} from '../actions/types';


export default function(state = { authenticated: false, admin_privileges: false }, action) {

  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', user: action.payload, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false, admin_privileges: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, companies: action.payload };
    case FETCH_ADMIN_MESSAGE:
      return { ...state, companies: action.payload };
    case SET_ADMIN_PRIVILEGES:
      return { ...state, admin_privileges: true };
    case ADD_COMPANY:
      return { ...state, companies: action.payload };
    default:
      return state;
  }

}
