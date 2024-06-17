export function getProfileImage(session) {
  if (session.user.image != undefined) {
    return session.user.image;
  }
  return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
}
