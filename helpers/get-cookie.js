// const getCookie = (headers, cookieKey) => {
//     if (headers.cookie) {
//         for (let cookieHeader of headers.cookie) {
//             const cookies = cookieHeader.value.split(';');
//             for (let cookie of cookies) {
//                 const [key, val] = cookie.split('=');
//                 if (key === cookieKey) {
//                     return val;
//                 }
//             }
//         }
//     }
//     return null;
// }

// module.exports = {
//     getCookie
// }