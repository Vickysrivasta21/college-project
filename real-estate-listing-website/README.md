## Real-Estate Web Portal

This project deals with the online trading of real-estate properties situated in various parts of the world.

This project is made to fulfil the requirements of Web Technology class.

### Technologies Used

- next.js
- react
- react-dom
- react-toastify

### Development
Steps

1. Add the following environment variables to `.env` file.

For Frontend:

| Variable                   | Explaination                             |
| :----------------          | :------:                                 |
| `NEXT_PUBLIC_API_BASE_URL` |   The base URL of the backend with port. |

For Backend:

| Variables    | Explaination                                    |
| :---         | :------:                                        |
| `PORT`       | The port on which the backend server should run |
|`JWT_SECRET`  |   random 40 character string for secret.        |
|`MONGODB_URL` | URL for connection to MONGODB Server            |



2. Run Frontend by `npm run dev` or `next dev` 
3. run the backend server from the backend directory `backend` using `node server.js`
4. Enjoy.
