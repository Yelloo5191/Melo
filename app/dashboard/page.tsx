import Dashboard from "@/components/Dashboard";

import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (session) {
    const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    console.log(res);
    const tracks = await res.json();

    const res2 = await fetch(
      "https://api.spotify.com/v1/recommendations?seed_artists=" +
        tracks.items[0].artists[0].id +
        "&seed_genres=" +
        "" +
        "&seed_tracks=" +
        tracks.items[0].id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    const recoms = await res2.json();

    return <Dashboard topTracks={tracks.items} recoms={recoms.tracks} />;
  } else {
    return <p>You must sign in before accessing your dashboard.</p>;
  }
}
