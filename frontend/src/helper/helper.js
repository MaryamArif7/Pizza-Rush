import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export async function getUsername() {
    const token = localStorage.getItem('token');
    
    // Check if the token exists
    if (!token) {
        throw new Error("Cannot find Token");
    }
    
    // Decode the token
    const decoded = jwt_decode(token);
    
    return decoded; // Return the decoded token
}
/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function 
 *the values obj which wer passes to registerUser are recived here
 as the credentials 
 * then the req is made to the api the data,message ,status sent from the 
 backedn is desrtured
 from credinetails username and emial is desrucrued
/**
 * Registers a new user and sends a confirmation email if registration is successful.
 */
export async function registerUser(credentials) {
    const { username, email } = credentials;

    try {
        // Send registration request
        const response = await axios.post(`/api/register`, credentials);
        const { data: { msg }, status } = response;

        // If registration was successful, send a confirmation email
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
        }

  
        return msg;
    } catch (error) {
     
        console.error('Registration error:', error);
        throw new Error('Registration failed. Please try again.');
    }
}

/** login function */
export async function verifyPassword({ username, password }) {
    if (!username || !password) {
        throw new Error("Username and password are required.");
    }

    try {
        const { data } = await axios.post('/api/login', { username, password });
        return data; 
    } catch (error) {
        console.error('Verification error:', error); 
        throw new Error("Password doesn't match...!");
}
}
/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response,
             { headers : { "Authorization" : `Bearer ${token}`}});

        return data;
    } catch (error) {
        console.error('Updation Error:', error); 
        throw new Error("Profile could'not be updated...!");
    }
}

/** generate OTP */
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });

      
        if (status === 201) {
            const { data: { email } } = await getUser({ username });
            const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            
            await axios.post('/api/registerMail', {
                username,
                userEmail: email,
                text,
                subject: "Password Recovery OTP"
            });
        }
        
        return code; 
    } catch (error) {
        console.error('OTP generation error:', error); 
        throw new Error("Failed to generate OTP. Please try again."); 
    }
}
/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return console.log("Error",error)
    }
}

/** reset password */
export async function resetPassword({ username, password }) {
    if (!username || !password) {
        throw new Error("Username and password are required.");
    }

    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return { data, status };
    } catch (error) {
        console.error('Reset password error:', error); 
        throw new Error("Failed to reset password. Please try again."); 
    }
}