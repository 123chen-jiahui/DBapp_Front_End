<template>
  <div class="text-center">
    <v-menu
    top
    :close-on-click="closeOnClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        v-on:click="GetDate"
        >
          {{ChosenYear}}年{{ChosenMonth}}月{{ChosenDate}}日，星期{{DayToChinese(ChosenDay)}}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="ChooseDay(index)"
        >
          <v-list-item-title>{{ item.title }} ({{ Years[index] + '年' + Months[index] + '月' + Days[index] + '日，星期' + WeekOfDaysOfChinese[index]}})</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: 'DateMenu',
  data: () => ({
    items: [
      { title: '今天' },
      { title: '明天' },
      { title: '后天' },
    ],
    closeOnClick: true,
    ChosenDate: (new Date).getDate(),
    ChosenYear: (new Date).getFullYear(),
    ChosenMonth: (new Date).getMonth() + 1,
    ChosenDay: (new Date).getDay(),

    Dates: [],
    Years: [],
    Months: [],
    Days: [],
    WeekOfDays: [],
    WeekOfDaysOfChinese: [],
  }),
  methods: {
    DayToChinese(d) {
      if (d === 0) {
        return '日'
      } else if (d === 1) {
        return '一'
      } else if (d === 2) {
        return '二'
      } else if (d === 3) {
        return '三'
      } else if (d === 4) {
        return '四'
      } else if (d === 5) {
        return '五'
      } else {
        return '六'
      }
    },
    GetDate() {
      this.Dates.length = 0
      this.Years.length = 0
      this.Months.length = 0
      this.Days.length = 0
      this.WeekOfDays.length = 0
      this.WeekOfDaysOfChinese.length = 0
      console.log('helloaaa')
      for (var i = 0; i < 3; i ++) {
        let date = new Date()
        date.setDate(date.getDate() + i)
        this.Dates.push(date)
        this.Years.push(date.getFullYear())
        this.Months.push(date.getMonth() + 1)
        this.Days.push(date.getDate())
        this.WeekOfDays.push(date.getDay())
        this.WeekOfDaysOfChinese.push(this.DayToChinese(date.getDay()))
      }
    },
    ChooseDay(i) {
        this.ChosenYear = this.Years[i]
        this.ChosenMonth = this.Months[i]
        this.ChosenDate = this.Days[i]
        this.ChosenDay = this.WeekOfDays[i]
        this.$emit("GetDay", this.WeekOfDays[i])
    }
  },
}
</script>
