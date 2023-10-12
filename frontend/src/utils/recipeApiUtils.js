const getQueryStringOf = (name, params) => {
    let queryString = "";

    if (!params?.length) return queryString;

    params.forEach(param => {
        queryString += `&${name}=${param}`;
    });

    return queryString;
};

const createQueryStringOldVersion = (query, page, diet, health, cuisineType, mealType, dishType) => {
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const authString = `&app_id=${edamamAppId}&app_key=${edamamApiKey}`;

    const queryString = query?.trim() ? `q=${query.trim()}` : "";
    const fromToString = `&from=${(page - 1) * 10}&to=${page * 10}`;
    const dietString = diet ? `&diet=${diet}` : "";
    const healthString = getQueryStringOf("health", health);
    const cuisineTypeString = getQueryStringOf("cuisineType", cuisineType);
    const mealTypeString = mealType ? `&mealType=${mealType}` : "";
    const dishTypeString = getQueryStringOf("dishType", dishType);

    const _queryString = `${queryString}${dietString}${healthString}${mealTypeString}${cuisineTypeString}${dishTypeString}${fromToString}${authString}`;

    return _queryString;
};

const createQueryStringNewVersion = (query) => {
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const authString = `&app_id=${edamamAppId}&app_key=${edamamApiKey}`;

    const queryString = query?.trim() ? `q=${query.trim()}` : "";

    return `?type=public&${queryString}${authString}&random=true&field=uri&field=label&field=image&field=source&field=url&field=yield&field=calories&field=cuisineType&field=mealType`;
};

export {
    getQueryStringOf,
    createQueryStringOldVersion,
    createQueryStringNewVersion
};