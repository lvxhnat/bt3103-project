<template>
    <v-app>
      <v-app-bar
        style="padding: 0px 90px"
        app
        color="#118951"
        dark
        elevation="6"
        elevate-on-scroll
      >
        <router-link to="/" style="text-decoration: none; color: inherit">
          <v-app-bar-title style="color: #f8f4ed">SECONDSERVINGS</v-app-bar-title>
        </router-link>
  
        <v-spacer></v-spacer>
  
        <v-list class="d-flex align center" style="background-color: #118951">
          <template v-if="!user">
            <v-btn
              variants="outlined"
              color="#f8f4ed"
              @click="navigateToUserLogin"
            >
              USER LOGIN
            </v-btn>
            <v-btn outlined color="#f8f4ed" @click="navigateToBusinessLogin">
              BUSINESS LOGIN
            </v-btn>
          </template>
          <template v-else>
            <!-- Display "USER PROFILE" button for user accounts -->
            <template v-if="user.accountType === 'user'">
              <v-btn
                variants="outlined"
                color="#f8f4ed"
                @click="navigateToUserProfile"
              >
                USER PROFILE
              </v-btn>
            </template>
            <!-- Display "BUSINESS PROFILE" button for business accounts -->
            <template v-else-if="user.accountType === 'business'">
              <v-btn outlined color="#f8f4ed" @click="navigateToBusinessProfile">
                BUSINESS PROFILE
              </v-btn>
            </template>
            <v-btn outlined color="#f8f4ed" @click="logout"> LOGOUT </v-btn>
          </template>
        </v-list>
      </v-app-bar>
    </v-app>
  </template>
  
  
  <script>
  export default {
    // Component logic goes here
  };
  </script>
  
  <style>
  /* CSS styles for the component go here */
  </style>