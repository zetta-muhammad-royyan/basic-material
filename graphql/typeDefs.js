const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    # Song
    getAllSongs(page: Int, sortBy: String, sortOrder: String): SongPagination!
    getSongById(id: ID!): Song
    getSongsWithPlaylist: [SongWithPlaylist!]!
    statsGroupedSong(parameter: String!): [GroupedSongs!]!
    # end song

    # playlist
    playlists(page: Int, limit: Int): PlaylistPagination!
    playlist(id: ID!): Playlist!
    # end playlist
  }

  type Mutation {
    # User
    login(username: String!, password: String!): AuthToken
    register(name: String!, username: String!, email: String!, password: String!): AuthToken
    # end user

    # Song
    addNewSong(title: String!, artist: String!, album: String!, genre: String!, duration: Int!, playlistId: ID): SongResponse!

    updateSong(id: ID!, title: String!, artist: String!, album: String!, genre: String!, duration: Int!, playlistId: ID): SongResponse!

    deleteSong(id: ID!): SongResponse!
    # end song

    # playlist
    createPlaylist(name: String!, description: String, songs: [ID!]!): Playlist!
    updatePlaylist(id: ID!, name: String!, description: String, songs: [ID!]!): Playlist!
    deletePlaylist(id: ID!): Boolean!
    # end playlist
  }

  # User
  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
  }

  type AuthToken {
    token: String!
  }
  # end user

  # song
  type Song {
    _id: ID!
    title: String!
    artist: String!
    album: String!
    genre: String!
    duration: Int!
    playlist: Playlist
  }

  type SongResponse {
    message: String!
    song: Song
  }

  type SongPagination {
    totalSongs: Int!
    totalPages: Int!
    currentPage: Int!
    songs: [Song!]!
  }

  type SongWithPlaylist {
    song: Song!
    playlist: Playlist
  }

  type GroupedSongs {
    _id: String!
    totalDuration: Int!
    songs: [Song!]!
  }
  # end song

  # playlist
  type Playlist {
    _id: ID!
    name: String!
    description: String
    songs: [Song]
    creator: User
  }

  type PlaylistPagination {
    totalPlaylists: Int!
    totalPages: Int!
    currentPage: Int!
    playlists: [Playlist!]!
  }
  #end playlist
`;

module.exports = typeDefs;
