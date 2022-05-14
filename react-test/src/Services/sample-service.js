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
