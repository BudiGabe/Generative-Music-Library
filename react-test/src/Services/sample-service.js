let apiUrl = 'http://localhost:8080/api/samples/'
let token = localStorage.getItem("jwt")

export const getSamples = () => {
    return fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
}

export const likeSample = (sample) => {
    return fetch(apiUrl + 'like/' + sample.id, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
}

export const getSamplesNew = () => {
    return fetch(apiUrl + 'new', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
}

export const getSamplesTop = () => {
    return fetch(apiUrl + 'top', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
}

export const saveSample = (sample) => {
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(sample)
    })
        .then(response => response.json())
}

export const getSampleById = (id) => {
    return fetch(apiUrl + 'id/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
}

export const getSampleByName = (name) => {
    return fetch(apiUrl + 'name/' + name, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
}
