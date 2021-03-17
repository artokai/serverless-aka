const aliases = require('../aliases.json');
module.exports = async function (context, req) {
    let alias = (req.query.alias || (req.body && req.body.alias)) || "";
    alias = alias.toLowerCase().replace(/^\//, "").replace(/\?.*/, "").replace(/\/$/, "");
    if (aliases[alias]) {
        context.log(`Redirecting to url = ${aliases[alias]}`);
        context.res.status(301).set('location', aliases[alias]).send();
    } else {
        context.log(`Alias for '${alias}' not found.`);
        context.res.status(404).send();
    }
};
