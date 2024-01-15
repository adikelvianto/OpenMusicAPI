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

## Automated Testing with Postman
You can find the files for automation testing [here](https://github.com/adikelvianto/OpenMusicAPI/tree/main/postman)

# Getting Started with OpenMusic API

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) - Runtime environment for JavaScript.
- [PostgreSQL](https://www.postgresql.org/) - Database server.
- [Redis](https://redis.io/) - In-memory data structure store.
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker.
- [Git](https://git-scm.com/) - Version control system.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/OpenMusicAPI.git
   cd OpenMusicAPI
2. Create .env file consisting this template
    ```env
    HOST=localhost
    PORT=5000

    # PostgreSQL Database
    PGUSER=your_postgres_user
    PGHOST=localhost
    PGPASSWORD=your_postgres_password
    PGDATABASE=your_postgres_database
    PGPORT=your_postgres_port

    # JWT Token
    ACCESS_TOKEN_KEY=2862379d4164bf0d9f5e48d47c0f68dff921e3d24baf2847ebace82e26264e2307c1676fb7b17ecdb925285783fe7a4a5e58acbfe12691029cae1e8cae37d2c2
    REFRESH_TOKEN_KEY=92c03f52876f7fdd298d564510ebc9a43d5f5f6abee41c984e2ccd6dc8bd7f6172cccb3711d3ff252b02e009844be73a6be9f3a887d6f0e891be0436d34697c7
    ACCESS_TOKEN_AGE=1800

    # Message Broker
    RABBITMQ_SERVER=amqp://localhost

    # Redis
    REDIS_SERVER=localhost
3. Execute databse creation: </br>
   Run the following command to execute the database migration and create the necessary tables:
    ```bash
    npm run migrate up
4. Run the application:
    - Run in development mode:
    ```bash
    npm run start-dev
    ```
    - Run in production mode:
    ```bash
    npm run start-prod
    ```


