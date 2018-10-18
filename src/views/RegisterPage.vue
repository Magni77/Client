<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-tooltip right>
                  <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" >
                    {{valid}}
                  <v-text-field
                     v-model="user.email"
                    prepend-icon="email"
                    name="email"
                    :rules="emailRules"
                    label="E-Mail"
                    type="email"></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="user.password"
                    :rules="passwordRules"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"></v-text-field>
                  <v-text-field
                    id="password-conf"
                    v-model="user.passwordConf"
                    :rules="passwordConfRules"
                    prepend-icon="lock"
                    name="password-conf"
                    label="Confirm Password"
                    type="password"></v-text-field>
                  <v-text-field
                    id="fname"
                    v-model="user.fname"
                    :rules="[v => !!v || 'First name is required']"
                    prepend-icon="person"
                    name="fname"
                    label="First Name"
                    type="text"></v-text-field>
                  <v-text-field
                    id="lname"
                    v-model="user.lname"
                    prepend-icon="person"
                    :rules="[v => !!v || 'Last name is required']"
                    name="lname"
                    label="Last Name"
                    type="text"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary">Register</v-btn>
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
        passwordConf: '12345',
        fname: 'place',
        lname: 'holder',
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must be more than 5 characters',
      ],
      passwordConfRules: [
        v => !!v || 'Password is required',
        v => (v && v === this.user.password) || 'Passwords must be the same',
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const userData = {
          email: this.user.email,
          password: this.user.password,
          first_name: this.user.fname,
          last_name: this.user.lname,
        };
        this.$store.dispatch('register', userData);
        this.$router.push({ name: 'login' });
      }
    },
  },
};

</script>
