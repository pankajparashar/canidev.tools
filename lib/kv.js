export const getViewCount = slug => {
    return fetch(`https://real-catfish-46253.kv.vercel-storage.com/get/${slug}`, {
        headers: {
            Authorization: "Bearer AbStASQgMTViZjljMWYtZDFjMS00YzExLWE2ZDgtMTQ1NTJmMWVkZDFlNTU2YWMzMzdmMTUyNGU4YjhjMjMzMjcxMTE1YjAxN2M=",
        },
    });
};

export const setViewCount = (slug, count) => {
    fetch(`https://real-catfish-46253.kv.vercel-storage.com/set/${slug}/${count}`, {
        headers: {
            Authorization: "Bearer AbStASQgMTViZjljMWYtZDFjMS00YzExLWE2ZDgtMTQ1NTJmMWVkZDFlNTU2YWMzMzdmMTUyNGU4YjhjMjMzMjcxMTE1YjAxN2M=",
        },
    });
};
