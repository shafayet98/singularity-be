const express = require('express');
const register = require('./routes/register');
const login = require('./routes/login');
const genre = require('./routes/genre');
const users = require('./routes/users');
const func = require('joi/lib/types/func');
const interMsgDev = require('./middleware/developerMiddle');
const app = express();

app.use(express.json());

/*
LOGIN and REGISTER - Service - FOR USER, DEVELOPER, ADMIN
*/
app.use('/api/register', register);
app.use('/api/login', login);

// genre service
// app.use(interMsgDev); // middleware used by developer to customise the message //
app.use('/api/genres', genre);
/*
Services
---------
1. api/genres - get all genres
2. api/genres/:id - get one genre
3. api/genres - post one genre
4. api/genres/:id - update one genre
5. api/genres/:id - delete one genre
6. api/genres - delete all genres

*/

// admin - service over user
app.use('/api/admin/users', users);
/*
Services
---------
1. api/admin/users - get all users
2. api/admin/users/:id - get one user
3. api/admin/users - post one user
4. api/admin/users/:id - update one user
5. api/admin/users/:id - delete one user
6. api/admin/users - delete all user
*/

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listeing on port ${port}`);
})