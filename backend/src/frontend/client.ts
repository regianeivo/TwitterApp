// creates a new user
(async () => {
    const data = {
        email: "test@demo.com",
        password: "secret"
    };
    const response = await fetch(
        "http://localhost:8080//api/v1/user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//Returns a user​ with all its activity (tweets and comments)
(async () => {
    const response = await fetch(
        "http://localhost:8080/api/v1/user/1",
        {
            method: "GET"
        }
    );
    const json = await response.json();
    console.log(json);
})();

//to login, if the user is found on database it returns a token
(async () => {
    const data = {
        email: "test@demo.com",
        password: "secret"
    };
    const response = await fetch(
        "http://localhost:8080/api/v1/auth/login/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//return all tweets
(async () => {
    const response = await fetch(
        "http://localhost:8080/api/v1/tweets",
        {
            method: "GET"
        }
    );
    const json = await response.json();
    console.log(json);
})();

//return a tweet and its comments
(async () => {
    const response = await fetch(
        "http://localhost:8080/api/v1/tweets/1",
        {
            method: "GET"
        }
    );
    const json = await response.json();
    console.log(json);
})();

//creates a new link - you must pass a valid token at the header
(async () => {
    const data = {
        url: "www.something.ie",
        title: "title of something.."
    };
    const response = await fetch(
        "http://localhost:8080//api/v1/tweets/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//deletes a link - you must pass a valid token at the header
(async () => {
    const response = await fetch(
        "http://localhost:8080//api/v1/tweets/1",
        {
            method: "DELETE",
            headers: {
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            }
        });
    const json = await response.json();
    console.log(json);
})();

//uplike a tweet - you must pass a valid token at the header 
//users are not allow to vote the same link twice
(async () => {
    const response = await fetch(
        "http://localhost:8080//api/v1/tweets/uplike",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            },
        }
    );
    const json = await response.json();
    console.log(json);
})();

//downlike a tweet - you must pass a valid token at the header 
//users are not allow to vote the same link twice
(async () => {
    const response = await fetch(
        "http://localhost:8080//api/v1/tweets/2/downLike",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            },
        }
    );
    const json = await response.json();
    console.log(json);
})();

//creates a new comment - you must pass a valid token at the header
(async () => {
    const data = {
        text: "comment something here...",
        link: 2 //inform the link id you want to comment
    };
    const response = await fetch(
        "http://localhost:8080//api/v1/comments/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//Updates the content of a comment - you must pass a valid token at the header
(async () => {
    const data = {
        text: "update your comment here..."
    };
    const response = await fetch(
        "http://localhost:8080//api/v1/comments/4",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    console.log(json);
})();

//deletes a comment - you must pass a valid token at the header
//users are only allow to delete their own comment
(async () => {
    const response = await fetch(
        "http://localhost:8080//api/v1/comment/6",
        {
            method: "DELETE",
            headers: {
                "x-auth-token": "INSERT YOUR TOKEN HERE"
            }
        });
    const json = await response.json();
    console.log(json);
})();