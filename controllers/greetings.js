const helloRoute = (req, res) => {
    res.send('Hello! Please use a forward slash / and then "superheros" or "api-docs"');
};

module.exports = {
    helloRoute,
};