import { auth, db } from "../../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

export const HandleRegister = async ({ email, password }) => {

    const user = {
        email: email,
        password: password,
        accountCreatedWith: "email",
        cookiesAccepted: false,
        role: "user",
        created: new Date(),
        activeAccount: true
    };
    
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        await saveUserToFirestore(userCredential.user.uid, user);
        toast.success(`Successfully registered user, welcome!`);

    } catch (error) {
        toast.error("Error registering user");
        console.error(error);return false;
    }

    return true;

};

const saveUserToFirestore = async (uid, user) => {
    
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
        ...user,
        uid: uid,
        created: new Date(),
        activeAccount: true,
    });

};

export const HandleGoogleRegister = async ({ navigate }) => {
    
    try {
        
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        
        await handleOAuthUser(user.uid, user, "Google");

        navigate("/");
        
    } catch (error) {
        console.error("Error: ", error);
        toast.error("Error registering user");
    }

};


export const HandleGitHubRegister = async ({ navigate }) => {
    
    try {
        
        const provider = new GithubAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        await handleOAuthUser(user.uid, user, "GitHub");

        navigate("/");

    } catch (error) {
        console.error("Error: ", error);
        toast.error("Error registering user");
    }

};

const handleOAuthUser = async (uid, user, provider) => {

    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        
        await saveUserToFirestore(uid, {
            email: user.email || "",
            accountCreatedWith: provider,
            cookiesAccepted: false,
            role: "user",
            created: new Date(),
            activeAccount: true
        }, provider);

        toast.success(`Successfully registered user, welcome!`);

    } else {toast.info(`Welcome back!`);}

};