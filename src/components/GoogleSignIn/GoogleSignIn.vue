<template>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
</template>

<script>
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"

export default {
    name: 'GoogleSignIn',
    mounted() {
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
                uiShown: function () {
                    document.getElementById('loader').style.display = 'none';
                }
            }
        }
        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>
