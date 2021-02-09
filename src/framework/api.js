import config from '../config';

/**
 * @param {string} type
 * @param {string} url
 * @param {object} data
 * @param {boolean} isAuthorized
 */
export function http(type, url, data, isAuthorized = true) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: type,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: isAuthorized
                    ? 'Bearer ' + sessionStorage.getItem(config.TOKEN)
                    : null,
            },
            body: data ? JSON.stringify(data) : null,
        })
            .then(function (res) {
                if (res.status === 200) {
                    var jsonPromise = res.json();
                    jsonPromise
                        .then(function (object) {
                            return resolve(object);
                        })
                        .catch(function (res) {
                            return resolve();
                        });
                    return jsonPromise;
                } else if (res.status === 401) {
                    var jsonPromise = res.json();
                    jsonPromise
                        .then(function (object) {
                            return reject(object.error);
                        })
                        .catch(function (res) {
                            return reject();
                        });
                    return jsonPromise;
                } else if (res.status === 422) {
                    var jsonPromise = res.json();
                    jsonPromise
                        .then(function (object) {
                            return reject(object.email[0]);
                        })
                        .catch(function (res) {
                            return reject();
                        });
                    return jsonPromise;
                }
            })
            .then(function (res) {
                resolve(res);
            })
            .catch(function (res) {
                reject(res);
            });
    });
}
