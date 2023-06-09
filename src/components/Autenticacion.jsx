import { auth, googleProvider } from '../config/Firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi'

const Autenticacion = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
            console.log(user)
        });

        // Clean up the observer on component unmount
        return () => {
            unsubscribe();
        };
    }, []);

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            alert(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="flex justify-center flex-row gap-5">
                <div className="flex flex-col">
                    <button onClick={signInGoogle} className="border border-black flex items-center px-3 rounded py-1">
                        <FcGoogle className="mr-2" />
                        <span>Iniciar Sesion Con Google</span>
                    </button>
                </div>
                <div className="flex flex-col">
                    <button onClick={logOut} className="border border-black flex items-center px-3 rounded py-1">
                        <FiLogOut className='mr-2' />
                        <span>Cerrar Sesion</span>
                    </button>
                </div>
                {user ? <div className='flex flex-col'>
                    <img src={auth.currentUser?.photoURL} alt="User Profile" className='rounded-md' />
                </div> : ''}
            </div>
        </>
    );
}

export default Autenticacion;
