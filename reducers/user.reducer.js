export default function (user = null, action) {
  if (action.type == "storeUser") {
    return action.user;
  } else {
    return user;
  }
}
