export function getProfileImage(session) {
    if (session.user.image != undefined) {
        return session.user.image;
    }
    return "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
}

export async function createCustomPlaylist(session, mood) {
    if (!session) {
        return;
    }

    const { energy, tempo, key } = mood;

    const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });

    const tracks = await res.json();

    const response = await fetch(
        `https://api.spotify.com/v1/recommendations?limit=20&seed_artists=` +
            tracks.items[0].artists[0].id +
            "&seed_tracks=" +
            tracks.items[0].id +
            `&min_energy=${energy[0]}&max_energy=${energy[1]}&min_tempo=${
                tempo[0]
            }&max_tempo=${tempo[1]}&min_key=${Math.min(
                ...key
            )}&max_key=${Math.max(...key)}`,
        {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        }
    );

    const moodTrackData = await response.json();

    // create playlist
    const playlist = await fetch(
        `https://api.spotify.com/v1/users/${session.id}/playlists`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Melo Playlist: " + mood.name,
                description: "Your custom playlist created by Melo",
            }),
        }
    );

    const playListData = await playlist.json();

    // add tracks to playlist
    await fetch(
        `https://api.spotify.com/v1/playlists/${playListData.id}/tracks`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: moodTrackData.tracks.map((track) => track.uri),
            }),
        }
    );

    return playListData;
}
