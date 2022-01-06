import { FormEvent, useState } from "react"
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Preventing default
        e.preventDefault();

        // Making login request
        await login(username, password);
    }

    return(
        <form onSubmit={handleSubmit}>
            login
            
            <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
            <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <input type="submit" />
        </form>
    )
}