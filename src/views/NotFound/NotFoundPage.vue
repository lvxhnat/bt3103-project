<template>
    <NavBar />
    <v-app>
        <div class="notfound-container">
            <v-content>
                <v-container fluid class="pa-16 ma-5">
                    <img src="../../assets/auth/registration_floret_1.png" class="img-flore-1" />
                    <img src="../../assets/auth/registration_floret_2.png" class="img-flore-2" />
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

<style scoped>
.notfound-container {
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #f8f4ed;
}

.img-flore-1,
.img-flore-2 {
  position: absolute;
  width: 300px;
}

.img-flore-1 {
  bottom: 0;
  left: 0;
}

.img-flore-2 {
  top: 0;
  right: 0;
  margin-top: 80px; /* Value of navbar's height */
}
</style>