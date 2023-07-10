# OpenMusicAPI

This project is a submission that must be submitted to complete the "Belajar Fundamental Aplikasi Back-End" course on the Dicoding platform. 
OpenMusic API is created using **JavaScript** language with **Hapi plugin**, and **PostgreSQL** as its database service.

The features embedded in OpenMusic API include:
- Album data management
- Song data management
- Displaying a list of songs in album detail
- Query parameters for song search
- User registration and authentication
- Playlist data management
- Playlist collaboration
- Song export in playlist
- Uploading album covers
- Liking albums
- Server-side cache

Note: In the export feature, the message broker uses the AMQP protocol to enable the export process to not disturb the performance of the main server. The queue consumer folder can be found in [OpenMusicConsumer](https://github.com/adikelvianto/OpenMusicConsumer).
