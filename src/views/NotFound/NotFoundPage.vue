<template>
    <NavBar />
    <v-app>
        <div class="main-container">
            <v-content>
                <v-container fluid class="pa-5 ma-2">
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center">
                            <img src="../../assets/notfound/pagenotfound.png" height="450" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </div>
    </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
    name: 'NotFoundPage',
    components: {
        NavBar,
    }
}
</script>