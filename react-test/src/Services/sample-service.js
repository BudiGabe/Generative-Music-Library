let apiUrl = 'http://localhost:8080/api/samples/'

export const getSamples = () => {
    return fetch(apiUrl)
        .then(response => response.json())
}

export const likeSample = (sample) => {
    return fetch(apiUrl + 'like/' + sample.id, {
        method: 'PUT'
    })
        .then(response => response.json())
}

export const getSamplesNew = () => {
    return fetch(apiUrl + 'new')
        .then(response => response.json())
}

export const getSamplesTop = () => {
    return fetch(apiUrl + 'top')
        .then(response => response.json())
}

export const saveSample = (sample) => {
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(sample)
    })
        .then(response => response.json())
}

export const getSampleById = (id) => {
    return fetch(apiUrl + 'id/' + id)
        .then(response => response.json())
}

export const getSampleByName = (name) => {
    return fetch(apiUrl + 'name/' + name)
        .then(response => response.json())
}
