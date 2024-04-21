<template>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { collection, addDoc, setDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"

export default {
    name: 'UserGoogleSignIn',
    mounted() {
        const router = useRouter()
        const auth = getAuth();
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) ui = new firebaseui.auth.AuthUI(auth);
        const uiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: "/",
            signInOptions: [{
                provider: GoogleAuthProvider.PROVIDER_ID,
                fullLabel: 'Continue with Google'
            }],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult) {
                    const uid = authResult.user.uid;
                    const email = authResult.user.email;

                    // Check if the email exists in the users collection
                    const userQuery = query(
                        collection(db, 'users'),
                        where('email', '==', email)
                    )

                    // Check if the email exists in the businesses collection
                    const businessQuery = query(
                        collection(db, 'businesses'),
                        where('email', '==', email)
                    )

                    Promise.all([
                        getDocs(userQuery),
                        getDocs(businessQuery)
                    ]).then(([userSnapshot, businessSnapshot]) => {
                        if (userSnapshot.empty && businessSnapshot.empty) {
                            return addDoc(collection(db, 'businesses'), {
                                userId: uid,
                                email: email,
                                accountType: 'business',
                            }).then(() => {
                                return setDoc(doc(db, 'Top Up', email), {
                                    balance: 0,
                                    transactions: [],
                                });
                            }).then(() => {
                                alert('Successfully signed in as business!')
                                router.push('/');
                                return true;
                            }).catch(error => {
                                const errorMessage = error.message;
                                alert(errorMessage);
                                return false;
                            });
                        } else if (!userSnapshot.empty && businessSnapshot.empty) {
                            alert(
                                'You have a user account. Successfully signed in as user!'
                            )
                            router.push('/')
                        } else {
                            alert('Successfully signed in as business!')
                            router.push('/');
                            return true;
                        }
                    }).catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage);
                        return false;
                    });

                    return false;
                },
                uiShown: function () {
                    document.getElementById('loader').style.display = 'none';
                }
            },
        }
        ui.start("#firebaseui-auth-container", uiConfig);
    },
}
</script>
