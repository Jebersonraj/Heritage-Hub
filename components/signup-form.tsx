// app/components/signup-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Signup failed');
            }

            // Redirect to login page after successful signup
            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-muted-foreground mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded bg-input text-foreground"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-muted-foreground mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded bg-input text-foreground"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-muted-foreground mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded bg-input text-foreground"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-muted-foreground mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded bg-input text-foreground"
                        required
                    />
                </div>
                {error && <p className="text-destructive mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center text-muted-foreground">
                Already have an account?{' '}
                <a href="/login" className="text-primary hover:underline">
                    Log in
                </a>
            </p>
        </div>
    );
}