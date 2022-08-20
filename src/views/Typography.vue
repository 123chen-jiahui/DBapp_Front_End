<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list flat>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" @click="Sayhello"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <h1>{{count}}</h1>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

  export default {
    data: () => ({
      count: 0,
      item: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-airbag' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }),
    computed: {
      abc: function() {
        return count * count
      }
    },
    methods: {
      Sayhello() {
        alert('hello')
        this.count += 1
      },
    },
    created: {

    }
  }
</script>