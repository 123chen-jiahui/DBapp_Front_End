<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>添加医生</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn color="primary">hello</v-btn>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>注册员工</v-expansion-panel-header>
        <v-expansion-panel-content>
          <AddStaff />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import AddStaff from '../components/AddStaff.vue'
export default {
  name: 'Console',

  components: { AddStaff },

  data: () => ({

  })
}
</script>

