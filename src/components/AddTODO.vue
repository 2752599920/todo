<template>
  <div class="AddTODO">
    <h1>TODO</h1>
    <div class="selected" >
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio v-for="(item , i) in options" :key="i"  :name="i" :checked-color="item.color">
          <span v-text="i==radio ? item.text : ''"></span>
        </van-radio>
      </van-radio-group>
    </div>
    <van-field
        v-model="mission"
        rows="1"
        autosize
        label="任务"
        type="textarea"
        placeholder="准备做什么"
    />
    <van-field
        v-model="message"
        rows="1"
        autosize
        label="描述"
        type="textarea"
        placeholder="添加描述"
    />
    <van-cell class="date" title="日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm" />  
    <div class="btnItem">
      <button :class="`btn_text ${themeBtnColor}`" @click="date = today">今天</button>
      <button :class="`btn_text ${themeBtnColor}`" @click="date = tomorrow">明天</button>
      <button :class="`btn_text ${themeBtnColor}`" @click="date = nextWeek">下周</button>
      <button :class="`btn_text ${themeBtnColor}`" @click="show = true">选择日期</button>
    </div>
    <button :class="`btn ${themeBtnColor}`" @click="add()">Add</button>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AddTODO",
  data() {
    return {
      radio:0,
      options:[{
       text:'重要 紧急',
       color:"red"
      },{
       text:'重要 不紧急',
       color:"rgba(255, 166, 0, 0.7)"
      },{
       text:'不重要 紧急',
       color:"dodgerblue"
      },{
       text:'不重要 不紧急',
       color:"#83dfcf"
      }],
      mission:null,
      message:null,
      today:this.formatDate(new Date()),
      tomorrow:this.formatDate(new Date(),1),
      nextWeek:this.formatDate(new Date(),7),
      date: null,
      show: false,
    };
  },
  created(){
      this.themeBtnColor=`themeBtn${this.radio}`
      this.$store.state.vanTabbar = false
  },
  methods: {
    add(){
      if(!this.mission || !this.message || !this.date ){
        this.$toast.fail('Add Fail!');
      }else{
        let todo = {
          'mission':this.mission,
          'message':this.message,
          'date':this.date.substr(0,10),
          'day':this.date.substr(11,3),
          'index':this.radio,
          'stutas':0,
          };
        let todos = new Array();
        let sql = [];
        if(this.$ls.get('todos')!=null){
          sql = this.$ls.get('todos');
          sql = JSON.parse(sql);
          sql[this.radio].todolist.unshift(todo);
          // todos = JSON.stringify(sql);
        }else{
          // 当本地存储没有数据的时候,初始化数据
          for(let i=0;i<=3;i++){
            let item = {
              index:i,
              todolist:[]
            }
            sql.push(item);
          }
          sql[this.radio].todolist.unshift(todo);
          // todos = JSON.stringify(sql);
        }
        todos = JSON.stringify(sql);
        this.$ls.set('todos',todos)
        this.$toast.success('Add Success!');
        this.mission = null;
        this.message = null;
        this.date = null;
        this.$router.push({
          path: "/"
        })
      }
    },
    formatDate(date,type=0) {
      date.setTime(date.getTime()+type*24*60*60*1000);
      let yy = date.getFullYear();
      let mm = String(date.getMonth() + 1);
      let dd = String(date.getDate());
      mm = mm>9?mm:'0'+mm;
      dd = dd>9?dd:'0'+dd;
      let arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      return `${yy}/${mm}/${dd}(${arr_week[date.getDay()]})`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
  },
  destroyed(){
    // this.$store.state.vanTabbar = true
  },
  watch:{
    'radio':function(){
      this.themeBtnColor=`themeBtn${this.radio}`
    }
  }
};
</script>

<style lang="scss">
  .AddTODO {
    span{
      font-size: 16px;
    }
    h1 {
      text-align: center;
      transform: translateY(-20px);
    }
    button{
      border-radius: 20px;
      outline: none;
      border: none;
      text-align: center;
    }
    .date{
       .van-cell__title{
        // flex: .35;
        flex: none;
        width: 6.2em;
        margin-right: 12px;
      }
      .van-cell__value{
        span{
          float: left;
        }
      }
    }
    .btnItem{
      box-sizing: border-box;
      padding-left: 10px;
      .btn_text{
        font-size: 14px;
        // background: skyblue;
        color: white;
        margin: 10px 5px;
        padding:5px 12px;
        letter-spacing: 2px;
        font-weight: 500;
      }
    }
    .selected{
      box-sizing: border-box;
      padding-left: 20px;
      .van-radio .van-radio__icon{
        border:red 1px solid;
        border-radius: 50%;
      }
      .van-radio:nth-child(2) .van-radio__icon{
        border:rgba(255, 166, 0, 0.7) 1px solid;
      }
      
      .van-radio:nth-child(3) .van-radio__icon{
        border:dodgerblue 1px solid;
      }
      .van-radio:nth-child(4) .van-radio__icon{
        border:#83dfcf 1px solid;
      }
    }
    .btn{
      background: skyblue;
      color: white;
      width: 100px;
      padding: 6px;
      float: right;
      margin-right: 20px;
      letter-spacing: 2px;
    }
    .themeBtn0{
      background: rgba(255, 0, 0, 0.445);
    }
    .themeBtn1{
      background: rgba(255, 166, 0, 0.7);
    }
    .themeBtn2{
      background: dodgerblue;
    }
    .themeBtn3{
      background: #83dfcf;
    }
  }
  
</style>
