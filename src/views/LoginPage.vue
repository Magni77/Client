<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip right>
                  <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    prepend-icon="email"
                    v-model="user.email"
                    :rules="emailRules"
                    name="email"
                    label="E-Mail"
                    type="text">

                  </v-text-field>
                  <v-text-field
                    id="password"
                    v-model="user.password"
                    :rules="passwordRules"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password">

                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      valid: false,
      submitted: false,
      user: {
        email: 'hjkda@ddd.com',
        password: '12345',
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const userData = {
          email: this.user.email,
          password: this.user.password,
        };
        this.$store.dispatch('login', userData)
          .then(() => {
            this.$router.push({ name: 'home' });
          })
          .catch(
              err => console.log(err)
          );
      }
    },
  },
};

</script>
