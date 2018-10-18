<template>
  <v-toolbar
      app
      :clipped-left="true"
    >
      <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <!--<v-btn icon @click.stop="miniVariant = !miniVariant">-->
        <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
      <!--</v-btn>-->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

       <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        v-model="searchText"
        @keyup.enter="onEnterClick"
      ></v-text-field>

       <v-autocomplete
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        v-model="select"
        class="mx-3"
        flat
        label="Find your friends"
        solo-inverted
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
          <v-list-tile-title v-text="data.item.first_name + ' ' + data.item.last_name"></v-list-tile-title>
          <!--<v-list-tile-title v-text="tile"></v-list-tile-title>-->
        </v-list-tile-content>
                </template>
        <!--<v-list-tile-action>-->
          <!--<v-icon>mdi-coin</v-icon>-->
        <!--</v-list-tile-action>-->
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
  import { http } from './../common/http.js';
  import { mapGetters } from 'vuex';

  export default {
    name: "Toolbar",
      data () {
        return{
          title: 'Some shit',
          searchText: '',
          loading: false,
          items: [],
          search: null,
          select: null,
        }
    },
    watch: {
      search (val) {
          console.log(val, this.select, this.items)
        // val && val !== this.select &&
        this.querySelections(val)
      },
      select (val) {
          console.log(val, 'log')
            this.redirectToProfile(val.user)
      }
    },
    computed: {
        ...mapGetters([
          'user',
        ])
    },
    methods: {
      text: item => item.first_name + ' ' + item.last_name,
      objectValue: item => item,
      onEnterClick() {
          if (this.searchText){
            http.get('users?username=' + this.searchText)
            .then(response => {

                console.log(response)

          })

          }
        },
      redirect() {
        this.$router.push(
            {name:'profile', params: {user_id: this.$store.getters.user.id}}
        );
      },
      redirectToProfile(id){
        this.$router.push(
          {name:'profile', params: {user_id: id}}
        );
      },
      querySelections (v) {
        this.loading = true;
        http.get('users?username=' + v)
          .then(response => {
            console.log(response.data)
            this.items = response.data.map(
                // item => {
                //     return {
                //         first_name: item.first_name
                //     }
                // }
                item => item //.first_name + ' ' + item.last_name
            );
            this.loading = false;

          })
      }
    }
  }
</script>

<style scoped>

</style>
