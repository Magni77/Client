<template>
  <v-app>

    <v-navigation-drawer
      persistent
      permanent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <toolbar></toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer absolute class="pa-3">
      <v-spacer></v-spacer>
      <div>Michał Godkowicz &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Toolbar from './Toolbar.vue';

export default {
  name: 'Index',
  components: { Toolbar },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {},

};
</script>
