const songs = [
    { title: "Blinding Lights", artist: "The Weeknd", genre: "Pop", duration: "3:20" },
    { title: "Save Your Tears", artist: "The Weeknd", genre: "Synthpop", duration: "3:35" },
    { title: "In Your Eyes", artist: "The Weeknd", genre: "Synthpop", duration: "3:57" },
    { title: "Can't Feel My Face", artist: "The Weeknd", genre: "Pop", duration: "3:35" },
    { title: "Starboy", artist: "The Weeknd", genre: "R&B", duration: "3:50" },
    { title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", duration: "3:53" },
    { title: "Bad Habits", artist: "Ed Sheeran", genre: "Pop", duration: "3:50" },
    { title: "Shivers", artist: "Ed Sheeran", genre: "Pop", duration: "3:27" },
    { title: "Perfect", artist: "Ed Sheeran", genre: "Pop", duration: "4:23" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", genre: "Pop", duration: "4:41" },
    { title: "Levitating", artist: "Dua Lipa", genre: "Pop", duration: "3:23" },
    { title: "Don't Start Now", artist: "Dua Lipa", genre: "Pop", duration: "3:03" },
    { title: "New Rules", artist: "Dua Lipa", genre: "Pop", duration: "3:29" },
    { title: "Physical", artist: "Dua Lipa", genre: "Pop", duration: "3:13" },
    { title: "Break My Heart", artist: "Dua Lipa", genre: "Pop", duration: "3:41" },
    { title: "Peaches", artist: "Justin Bieber", genre: "R&B", duration: "3:18" },
    { title: "Holy", artist: "Justin Bieber", genre: "Pop", duration: "3:32" },
    { title: "Anyone", artist: "Justin Bieber", genre: "Pop", duration: "3:10" },
    { title: "Yummy", artist: "Justin Bieber", genre: "Pop", duration: "3:30" },
    { title: "Intentions", artist: "Justin Bieber", genre: "Pop", duration: "3:32" },
    { title: "Good 4 U", artist: "Olivia Rodrigo", genre: "Pop Rock", duration: "2:58" },
    { title: "Drivers License", artist: "Olivia Rodrigo", genre: "Pop", duration: "4:02" },
    { title: "Deja Vu", artist: "Olivia Rodrigo", genre: "Pop", duration: "3:35" },
    { title: "Brutal", artist: "Olivia Rodrigo", genre: "Alternative", duration: "2:24" },
    { title: "Traitor", artist: "Olivia Rodrigo", genre: "Pop", duration: "3:49" },
    { title: "Save Your Tears (Remix)", artist: "The Weeknd", genre: "Synthpop", duration: "3:11" },
    { title: "After Hours", artist: "The Weeknd", genre: "Synthwave", duration: "6:01" },
    { title: "Heartless", artist: "The Weeknd", genre: "Trap", duration: "3:18" },
    { title: "Call Out My Name", artist: "The Weeknd", genre: "R&B", duration: "3:48" },
    { title: "I Feel It Coming", artist: "The Weeknd", genre: "R&B", duration: "4:29" },
    { title: "Castle on the Hill", artist: "Ed Sheeran", genre: "Pop Rock", duration: "4:21" },
    { title: "Galway Girl", artist: "Ed Sheeran", genre: "Pop", duration: "2:50" },
    { title: "Beautiful People", artist: "Ed Sheeran", genre: "Pop", duration: "3:17" },
    { title: "I Don't Care", artist: "Ed Sheeran", genre: "Pop", duration: "3:39" },
    { title: "Photograph", artist: "Ed Sheeran", genre: "Pop", duration: "4:19" },
    { title: "IDGAF", artist: "Dua Lipa", genre: "Pop", duration: "3:38" },
    { title: "Hotter Than Hell", artist: "Dua Lipa", genre: "Pop", duration: "3:07" },
    { title: "Be the One", artist: "Dua Lipa", genre: "Pop", duration: "3:23" },
    { title: "Last Dance", artist: "Dua Lipa", genre: "Pop", duration: "3:48" },
    { title: "Love Again", artist: "Dua Lipa", genre: "Pop", duration: "4:18" },
    { title: "Ghost", artist: "Justin Bieber", genre: "Pop", duration: "2:33" },
    { title: "Lonely", artist: "Justin Bieber", genre: "Pop", duration: "2:29" },
    { title: "Sorry", artist: "Justin Bieber", genre: "Pop", duration: "3:20" },
    { title: "Love Yourself", artist: "Justin Bieber", genre: "Pop", duration: "3:53" },
    { title: "What Do You Mean?", artist: "Justin Bieber", genre: "Pop", duration: "3:25" },
    { title: "Happier", artist: "Olivia Rodrigo", genre: "Pop", duration: "2:55" },
    { title: "Hope Ur OK", artist: "Olivia Rodrigo", genre: "Pop", duration: "3:29" },
    { title: "Favorite Crime", artist: "Olivia Rodrigo", genre: "Pop", duration: "2:32" },
    { title: "Jealousy, Jealousy", artist: "Olivia Rodrigo", genre: "Pop", duration: "2:53" },
    { title: "1 step forward, 3 steps back", artist: "Olivia Rodrigo", genre: "Pop", duration: "2:43" }
];

let songByArtist = songs.reduce((acc, song) => {
    if (!acc[song.artist]) {
        acc[song.artist] = []
    }

    acc[song.artist].push(song)
    return acc
}, {})

let songByGenre = songs.reduce((acc, song) => {
    if (!acc[song.genre]) {
        acc[song.genre] = []
    }

    acc[song.genre].push(song)
    return acc
}, {})

let playlistsLessThanOneHour = {}
let groupedSong = []
let currentDuration = 0
let playlistCount = 1
for (let song of songs) {
    if (currentDuration + calculateSecond(song.duration) > 3600) {
        playlistsLessThanOneHour[`Playlist ${playlistCount}`] = {
            duration: calculateDuration(currentDuration),
            songs: groupedSong
        }

        currentDuration = 0
        playlistCount++
        groupedSong = []
    }

    groupedSong.push(song)
    currentDuration += calculateSecond(song.duration)
}

function calculateSecond(duration) {
    const [minute, second] = duration.split(':')
    return (parseInt(minute) * 60) + parseInt(second)
}

function calculateDuration(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, 0)}`
}

console.log(songByArtist)
console.log(songByGenre)
console.log(playlistsLessThanOneHour)