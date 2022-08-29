<template>
  <v-row justify="center">
    <v-expansion-panels accordion>

      <v-expansion-panel>
        <v-expansion-panel-header>注册员工</v-expansion-panel-header>
        <v-expansion-panel-content>
          <AddStaff />
        </v-expansion-panel-content>
      </v-expansion-panel>


      <v-expansion-panel>
        <v-expansion-panel-header>完善/更新员工信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <ModifyStaff />
        </v-expansion-panel-content>
      </v-expansion-panel>


      <v-expansion-panel>
        <v-expansion-panel-header>上传/更新员工照片</v-expansion-panel-header>
        <v-expansion-panel-content>
          <UploadPhotoForStaff />
        </v-expansion-panel-content>
      </v-expansion-panel>

      
    </v-expansion-panels>
  </v-row>
</template>

<script>
import AddStaff from '../components/AddStaff.vue'
import ModifyStaff from '../components/ModifyStaff.vue'
import UploadPhotoForStaff from '../components/UploadPhotoForStaff.vue';
export default {
  name: 'Console',

  components: { AddStaff, ModifyStaff, UploadPhotoForStaff },

  data: () => ({

  })
}
</script>

