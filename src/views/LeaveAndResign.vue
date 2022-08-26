<template>
    <v-container id="leave-and-resign" fluid tag="section">
        <v-card>
            <v-tabs background-color="white" color="primary" left>
                <v-tab>请假申请</v-tab>
                <v-tab>离职申请</v-tab>

                <v-tab-item v-for="n in 2" :key="n">
                    <v-container fluid>
                        <div v-if="(n == 1)">
                            <LeaveRequest />
                        </div>
                        <div v-if="(n == 2)">
                            <ResignationRequest />
                        </div>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import LeaveRequest from '../components/LeaveRequest.vue';
import ResignationRequest from '../components/ResignationRequest.vue';
export default {
    name: 'LeaveAndResign',
    components: { LeaveRequest, ResignationRequest },
}
</script>
