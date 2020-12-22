<template>
  <div id="app">
    <!-- 头部导航 -->
    <van-nav-bar v-show="$store.state.vanTabbar" fixed @click-left="formatDate(new Date(),-1)" @click-right="formatDate(new Date(),1)">
      <template #left>
          <van-icon name="arrow-left" size="18" color="skyblue" />
      </template>
      <template #title>
          <van-cell icon="calendar-o" :value="showDate" @click="show = true" />
          <van-calendar  v-model="show" @confirm="onConfirm" :show-confirm="false" />
      </template>
      <template #right>
          <van-icon name="arrow" size="18" color="skyblue" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <router-view class="centent"/>
    <!-- 底部导航 -->
    <van-tabbar route active-color="skyblue">
      <van-tabbar-item icon="wap-home" to="/"></van-tabbar-item>
      <van-tabbar-item icon="add" to="/AddTODO"></van-tabbar-item>
      <van-tabbar-item icon="todo-list" to="/TodoList"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    
    data() {
      return {
        active: 0,
        currentDay: "",
        showDate: '今天',
        date: this.formatDate(new Date()),
        show: false,
        oo:0,
      };
    },
    mounted(){
        this.getDate();
    },
    methods:{
        //获取年月日
        getDate(){
            let dates = new Date();
            let year = dates.getFullYear();
            let month = dates.getMonth() + 1;
            let date = dates.getDate();
            let tody = `${year}/${month}/${date}`;
            this.currentDay = tody;
            if(this.currentDay == this.date){
                this.showDate = '今天'
            }
            // return tody;
        },
        formatDate(date,type=0) {
            if(type == 0){
                this.oo = 0
            }else{
                type==1?this.oo++:this.oo--;
            }
            date.setTime(date.getTime() + this.oo*24*60*60*1000);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dates = date.getDate();
            month = month>9 ? month : '0'+month;
            dates = dates>9 ? dates : '0'+dates;
            this.showDate = `${year}/${month}/${dates}`;
            // console.log(this.showDate);
            this.$store.state.curdate = this.date = this.showDate;
            if(this.currentDay == this.date){
                this.showDate = '今天'
            }
            return `${year}/${month}/${dates}`;
        },
        onConfirm(date) {
            this.show = false;
            this.date = this.formatDate(date);
            this.showDate = this.date;
            if(this.currentDay == this.date){
                this.showDate = "今天"
            }
        },
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  .centent{
    margin:50px 0px;
    overflow: hidden;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
