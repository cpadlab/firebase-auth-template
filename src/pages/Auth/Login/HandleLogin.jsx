import { auth, db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

export const HandleLogin = async ({ email, password, setUserData }) => {

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const userSnapshot = await getDoc(doc(db, "users", uid));

        if (userSnapshot.exists()) {
            toast.success(`Welcome back!`);
            setUserData(userSnapshot.data());
        } else {
            toast.error("No user information found");
        }

        return true;

    } catch (error) {
        toast.error("Error logging in.");
        console.log(error);return false
    }

};

export const HandleGoogleLogin = async ({navigate, setUserData}) => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        await handleOAuthLogin(user.uid, navigate, setUserData);
    } catch (error) {
        console.log(error)
        toast.error("Error logging in.");
    }
};

export const HandleGitHubLogin = async ({ navigate, setUserData }) => {
    try {
        const provider = new GithubAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        await handleOAuthLogin(user.uid, navigate, setUserData);
    } catch (error) {
        console.log(error)
        toast.error("Error logging in.");
    }
};

const handleOAuthLogin = async (uid, navigate, setUserData) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        toast.success(`Welcome back!`);
        setUserData(userSnapshot.data());navigate('/');
    } else {
        toast.error("No user information found");
    }
};
