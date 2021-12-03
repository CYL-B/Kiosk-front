export default function (username = null, action) {
    if (action.type == 'set') {
        return action.username;
    } else {
        return username;
    }
}