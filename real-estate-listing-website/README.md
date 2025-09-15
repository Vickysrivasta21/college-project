## Real-Estate Web Portal

This project deals with the online trading of real-estate properties situated in various parts of the world.

This project is made to fulfil the requirements of Web Technology class.

### Technologies Used

- next.js
- react
- react-dom
- react-toastify
- better-auth
- mongodb

### Development
Steps

1. Add the following environment variables to `.env` file.
   
   Can also refer to `env.example` file.

For Frontend:

| Variable                   | Explaination                             |
| :----------------          | :------:                                 |
| `NEXT_PUBLIC_API_BASE_URL` |   The base URL of the backend with port. |
| `NEXT_PUBLIC_APP_URL`      | The base URL of the frontend with port.  |
| `AUTH_DATABASE_URL`        | The mongodb instance address for authentication database |
| `BETTER_AUTH_SECRET`       | The Better Auth Secret.
| `BETTER_AUTH_URL`          | Better Auth BASE URL ( The Base URL of the app) |

For Backend:

| Variables    | Explaination                                    |
| :---         | :------:                                        |
| `PORT`       | The port on which the backend server should run |
|`JWT_SECRET`  |   random 40 character string for secret.        |
|`MONGODB_URL` | URL for connection to MONGODB Server            |

2. Run `npm i` to install dependencies in both the root folder and the backend folder.
3. Run Frontend by `npm run dev` or `next dev` 
4. run the backend server from the backend directory `backend` using `node server.js`
5. Enjoy.


### Development:

1. Currently the authentication part is being handled by better-auth library, with its own mechanism to add/update/delete/verify the user using the mongodb database.
