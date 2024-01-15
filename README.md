# OpenMusic API

## Overview

This project is a submission for the "Belajar Fundamental Aplikasi Back-End" course on the Dicoding platform. The OpenMusic API is implemented using **node.js** with the **Hapi** plugin, **RabbitMQ**, **Nodemailer**, **Redis**, with **PostgreSQL** serving as its database. Data validation logic and error handling are implemented in this API. When validation fails, appropriate error messages are returned to ensure a smooth and secure user experience.

## Project Highlights

- **Album Data Management:**
  - Create: Add a new album to the database.
  - Retrieve: Get album information based on its ID.
  - Update: Modify album details using its ID.
  - Delete: Remove an album from the database by its ID.

- **Song Data Management:**
  - Create: Add a new song to the database.
  - Retrieve All: Get information about all songs.
  - Retrieve by ID: Get information about a specific song based on its ID.
  - Update by ID: Modify song details using its ID.
  - Delete by ID: Remove a song from the database by its ID.

- **Display List of Songs in Album Detail:**
  - Retrieve the list of songs within a specific album by its album ID.

- **Query Parameters for Song Search:**
  - Purpose: Search for song using query parameters.
  - Parameters: 
    - `?title`: Search for songs based on the song title.
    - `?performer`: Search for songs based on the performer.

- **User Management and Authentication:**
  - Add a new user to the system.
  - Authenticate a user and generate an access token using Jwt token.
  - Refresh or update the user's access token.
  - Remove authentication for a user.

- **Playlist Data Management:**
  - Create: Add a new playlist to the database.
  - Retrieve All: Get information about all playlists owned by the user.
  - Delete by ID: Remove a playlist from the database by its ID.
  - Playlist is a restricted resource that requires an access token to access it, and only the playlist owner can add, view, and delete songs from the playlist.
  
- **Song Management in Playlists:**
  - Create: Add a valid song to specific playlist by its playlist ID.
  - Retrieve All: Get information about all songs within a specific playlist by its playlist ID.
  - Delete: Remove a song from a specific playlist by its playlist ID.

- **Playlist Collaboration:**
  - Create: Add collaborator users to a specific playlist.
  - Delete: Remove collaborator users from a specific playlist.
  - Collaborator Rights: Collaborator users have the same rights as the playlist owner, except for deleting the playlist

- **Song Export in Playlist:**
  - Export songs in a playlist using the AMQP protocol with **RabbitMQ** as the designated message broker.
  - Only the playlist owner is allowed to export songs.
  - The export result is in the form of JSON data and is sent via email using **Nodemailer**.

- **Uploading Album Covers:**
  - Create: Add album cover image.
  - Retrieve: Display the related album cover image.

- **Liking Albums:**
  - Like Album: Like a specific album.
  - Unlike Album: Unlike a specific album.
  - View Likes Count: View the number of likes for a specific album.
  - Liking or unliking requires authentication to access.
  - User can only like the same album once.

- **Server-side Cache:**
  - Implement server-side cache for the number of likes on an album.
  - Cache duration is 30 minutes.
  - Responses generated from the cache use a custom header property `X-Data-Source` with the value "cache."
  - The cache will be cleared whenever there is a change in the number of likes for a specific album.
  - The memory caching engine used is **Redis**.


## Export Feature Details

In the export feature, the message broker uses the **AMQP protocol** to enable the export process without disturbing the main server's performance. The queue consumer folder can be found in [OpenMusicConsumer](https://github.com/adikelvianto/OpenMusicConsumer).


## Getting Started
To set up and run the OpenMusic API locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/OpenMusic-API.git
   cd OpenMusic-API

2. Install dependecies:
   ```bash
   npm install
