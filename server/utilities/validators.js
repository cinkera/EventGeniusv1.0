const reduceUserDetails = data => {
    let userDetails = {};

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if (!isEmpty(data.name.trim())) userDetails.name = data.name;

    return userDetails;
};

module.exports = { reduceUserDetails };
