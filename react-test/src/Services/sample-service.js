let apiUrl = 'http://localhost:8080/api/samples/'

export const getSamples = () => {
    return fetch(apiUrl)
        .then(response => response.json())
}

export const likeSample = (sampleId) => {
    fetch(apiUrl + 'like/' + sampleId, {
        method: 'PUT'
    })
        .then(response => response.json())
        .then(data => console.log(data))
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
        body: sample
    })
        .then(response => response.json())
}
