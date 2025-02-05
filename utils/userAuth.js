// signUp, logIn, logOut

export async function signUp(fields) {
    let result = {
        message: "",
        status : 500
    }
    try {
        const response = await fetch('/api/authentication/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        });

        const data = await response.json();
        if(data.status === 200) {
            result = data;
        }else {
            throw new Error(data.message);
        }
    }catch (err) {
        result.message = err.message;
    }
    finally {
        return result;
    }
}

export async function logIn(fields) {
    let result = {
        message: "",
        status : 500,
        user: null
    }
    try {
        const response = await fetch('/api/authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        });

        const data = await response.json();
        if(data.status === 200) {
            result = data;
        }else {
            throw new Error(data.message);
        }
    }catch (err) {
        result.message = err.message;
    }
    finally {
        return result;
    }
}
