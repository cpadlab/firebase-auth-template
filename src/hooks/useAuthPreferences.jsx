import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase';

export const useAuthPreferences = () => {
    const [userData, setUserData] = useState(null);
    const [userRole, setUserRole] = useState("logged-out");
    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLogin(true);
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                
                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                    setUserRole(userSnap.data().role || "user");
                }
            } else {
                setIsLogin(false);
                setUserData(null);
                setUserRole("logged-out");
            }
        });
        
        return () => unsubscribe();
    }, []);

    return { userData, setUserData, userRole, isLogin };
};
