const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000; // You can change the port number if needed
var sha256 = require('js-sha256');

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'supabaseurl'
const supabaseKey = 'supabaseapikey'
const supabase = createClient(supabaseUrl, supabaseKey)
// Middleware to parse JSON requests
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
async function getUserByEmailAndToken(email, token) {
    try {
        const { data: user } = await supabase
            .from('Main')
            .select('*')
            .eq('email', email)
            .single();

        console.log(user)
        if (!user) {
            return null; // User not found
        }

        if (sha256(email + user.password) !== token) {
            return null; // Invalid token
        }

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Set all metrics for a user
app.post('/setAllMetrics', async (req, res) => {
    const { email, token, metrics } = req.body;

    const user = await getUserByEmailAndToken(email, token);

    if (!user) {
        return res.send({ msg: 'Invalid email or token', status: false });
    }

    try {
        await supabase
            .from('Main')
            .update({ metrics: metrics })
            .eq('email', email);

        return res.send({ msg: 'All metrics updated', status: true });
    } catch (error) {
        console.error(error);
        return res.send({ msg: 'Error', status: false });
    }
});


// Example route
app.post('/register', (req, res) => {
    try {
        const email = (req.body.email).toLowerCase()
        const password = req.body.password
        const name = req.body.name
        if (email == null || password == null || email == '' || password == '' || email == undefined || password == undefined || password.length < 5 || name == null || name == '' || name == undefined) {
            res.send({ msg: 'Your email, password or name is invalid. Please make sure that your password is over 5 characters long', })
        }
        supabase
            .from('Main')
            .select('email')
            .eq('email', email)
            .then(response => {
                console.log(response)
                if (response.data.length > 0) {
                    res.send({ msg: 'Email already registered' })
                } else {
                    //register user
                    supabase
                        .from('Main')
                        .insert([
                            { email: email, password: sha256(password), display_name: name },
                        ])
                        .then(response => {
                            console.log({ msg: 'User registered', token: sha256(email + sha256(password)) })
                            res.send({ msg: 'User registered', token: sha256(email + sha256(password)), email: email, name: name, status: true })
                        })

                }

            });
    } catch (e) {
        console.log(e)
        res.send({ msg: 'Error', status: false })
    }

});

app.post('/tracking', (req, res) => {
    const { email, token } = req.body
    console.log('token', token)

    supabase
        .from('Main')
        .select('*')
        .eq('email', email)
        .then(response => {
            console.log(response)
            if (response.data.length == 0) {
                res.send({ msg: 'User is not registered' })
            } else {
                if (sha256(email + response.data[0].password) != token) {
                    console.log(':(')
                    res.send({ msg: 'Email or token is incorrect' })
                }
                else {
                    console.log(':)')

                    res.send({ tracking: response.data[0].tracking })
                }

            }

        });
});



app.get('/getData', (req, res) => {
    supabase
        .from('Main')
        .select('*')
        .then(response => {

            res.send(response.data)
        });
});

app.post('/setTracking', (req, res) => {
    try {
        const { email, token, data } = req.body

        //data = {localDate: 10/14/23, unixTime: "2194923494234", metrics:[{metricName: 'metricName', metricValue: 'metricValue'}, {metricName: 'metricName', metricValue: 'metricValue'}]}

        console.log('token', token)

        if (!data) {
            res.send({ msg: 'No tracking added', status: false })
            return;
        }
        if (data.length == 0) {
            res.send({ msg: 'No tracking added', status: false })
            return;
        }

        let hasElement = false;
        supabase
            .from('Main')
            .select('*')
            .eq('email', email)
            .then(response => {
                try {
                    if (response.data.length == 0) {
                        res.send({ msg: 'User is not registered' })
                    } else {
                        let userData = response.data[0]
                        let prevTracking = []


                        if (userData.tracking == null || userData.tracking == undefined || userData.tracking.length == 0) {
                            hasElement = false;
                        }
                        else {
                            prevTracking = userData.tracking
                            for (let index = 0; index < userData.tracking.length; index++) {
                                const element = userData.tracking[index];
                                if (element.localDate == data.localDate) {
                                    hasElement = true;
                                    prevTracking[index] = data
                                    supabase
                                        .from('Main')
                                        .update({ tracking: prevTracking })
                                        .eq('email', email)
                                        .then(response => {
                                            console.log(response)
                                            res.send({ msg: 'Tracking added', status: true })
                                        })
                                    break;
                                    res.send({ msg: 'Tracking updated', status: false })

                                }
                            }
                        }

                        if (hasElement) {
                            return;
                        }

                        prevTracking.push(data)
                        supabase
                            .from('Main')
                            .update({ tracking: prevTracking })
                            .eq('email', email)
                            .then(response => {
                                console.log(response)
                                res.send({ msg: 'Tracking added', status: true })
                            })

                    }
                }
                catch (e) {
                    console.log(e)
                    res.send({ msg: 'Error', status: false })
                }
            });

    } catch (e) {
        console.log(e)
        res.send({ msg: 'Error', status: false })

    }
});


app.post('/getUserData', async (req, res) => {
    try {
        const { email, token } = req.body

        const user = await getUserByEmailAndToken(email, token);


        console.log(user)
        if (!user) {
            return res.send({ msg: 'Invalid email or token', status: false });
        }

        return res.send({ msg: 'User data', status: true, data: user });
    } catch (e) {
        console.log(e)
        res.send({ msg: 'Error', status: false })

    }
}
);


app.post('/setReviewers', (req, res) => {
    try {
        const { email, token, reviewers } = req.body

        console.log('token', token)

        if (!reviewers) {
            res.send({ msg: 'No reviewers added', status: false })
            return;
        }
        if (reviewers.length == 0) {
            res.send({ msg: 'No reviewers added', status: false })
            return;
        }


        for (let i = 0; i < reviewers.length; i++) {
            //check if element is a valid email
            if (reviewers[i].indexOf('@') == -1) {
                res.send({ msg: 'Invalid email' })
                return;
            }
        }
        supabase
            .from('Main')
            .update({ reviewers: reviewers })
            .eq('email', email)
            .then(response => {
                console.log(response)
                res.send({ msg: 'Reviewers added', status: true })
            })
    } catch (e) {
        console.log(e)
        res.send({ msg: 'Error', status: false })
    }
});


app.get('/test', (req, res) => {
    res.send('<h1 style="color:red;">Hello World</h1>')
});


app.post('/login', (req, res) => {
    try {
        const email = (req.body.email).toLowerCase()
        const password = req.body.password
        if (email == null || password == null || email == '' || password == '' || email == undefined || password == undefined || password.length < 5) {
            res.send({ msg: 'Your email, password or name is invalid. Please make sure that your password is over 5 characters long', })
            return;
        }
        supabase
            .from('Main')
            .select('*')
            .eq('email', email, 'password', password)
            .then(response => {
                try {
                    console.log(response)
                    if (response.data.length == 0) {
                        res.send({ msg: 'User is not registered' })
                    } else {

                        if (response.data[0].password != sha256(password)) {
                            res.send({ msg: 'Password is incorrect' })
                            console.log({ msg: 'Password is incorrect' })
                        }
                        else {
                            console.log({ msg: 'Logged in', token: sha256(email + sha256(password)), name: response.data[0].display_name, status: true })
                            res.send({ msg: 'Logged in', token: sha256(email + sha256(password)), email: email, name: response.data[0].display_name, status: true })
                        }

                    }
                }
                catch (e) {
                    console.log(e)
                    res.send({ msg: 'Error', status: false })
                }
            });
    } catch (e) {
        console.log(e)
        res.send({ msg: 'Error', status: false })
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});