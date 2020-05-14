const env = process.env.NODE_ENV;

const development = {
    frontend: "http://localhost:3000",
    backend: "http://localhost:8080"
};

const production = {
    frontend: "http://localhost:3000",
    backend: "http://localhost:8080"
};

const config = {
    development,
    production
};

module.exports = config[env];