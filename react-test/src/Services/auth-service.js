let apiUrl = 'http://localhost:8080/api/security/'

export const register = (user) => {
    return fetch(apiUrl + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
}

export const login = (userCreds) => {
    return fetch(apiUrl + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userCreds)
    })
        .then(response => response.json())
}
