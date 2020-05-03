db.createUser(
    {
        user: "randuser",
        pwd: "randpw",
        roles: [
            {
                role: "readWrite",
                db: "souvenirs-dev"
            }
        ]
    }
);