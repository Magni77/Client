<template>
  <v-toolbar
    app
    :clipped-left="true"
  >
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>

    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      class="mx-3"
      flat
      label="Find your friends"
      solo-inverted
      hide-no-data
      :item-text="text"
      :item-value="objectValue"
    >
      <template
        slot="selection"
        slot-scope="data"
      >
        <span v-text="data.item.first_name + ' ' + data.item.last_name"></span>
      </template>
      <template
        slot="item"
        slot-scope="data"
      >
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>

          <v-list-tile-content>
            <v-list-tile-title
              v-text="data.item.first_name + ' ' + data.item.last_name">
            </v-list-tile-title>
          </v-list-tile-content>
        </template>

      </template>

    </v-autocomplete>

    <v-spacer></v-spacer>

    <v-btn
      v-if="user" flat
      v-on:click="redirect"
    >
      {{ user.email }}
    </v-btn>

    <v-avatar color="indigo">
      <v-icon dark>account_circle</v-icon>
    </v-avatar>
  </v-toolbar>

</template>

<script>
import { mapGetters } from 'vuex';

import { http } from './../common/http';

export default {
  name: 'Toolbar',
  data() {
    return {
      title: 'Some shit',
      searchText: '',
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      if (typeof (val) === 'object'){
        this.redirectToProfile(val.user);
      }
    },
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    text: item => `${item.first_name} ${item.last_name}`,
    objectValue: item => item,
    redirect() {
      this.$router.push({ name: 'profile', params: { user_id: this.$store.getters.user.id } });
    },
    redirectToProfile(id) {
      this.$router.push({ name: 'profile', params: { user_id: id } });
    },
    querySelections(v) {
      this.loading = true;
      http.get(`users?username=${v}`)
        .then((response) => {
          this.items = response.data.map(item => item);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
