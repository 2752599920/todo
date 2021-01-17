<template>
  <div class="TodoList">
    <h1>Plan a <span style="color:#83dfcf"> Happy life </span> today...</h1>
    <van-empty v-show="show"
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="没有啦"
              />
        <div class="todoList" >
          <div class="listLeft listBox">
            <div class="f-box" v-for="(items , sqlIndex) in sql" :key='sqlIndex'>
              <div  v-for="(item,i) in items.todolist" :key="i" v-show="sqlIndex%2==0" :class="item.stutas==1?'todoItem complete':'todoItem'">
                <!-- 便签的头部 -->
                <div :class="`itemTop add${sqlIndex}`" >
                    <span class="ckBtn">
                      <van-checkbox v-model="item.stutas" :checked-color="theme" @click="edit()"></van-checkbox>
                      <span class="del"><van-icon name="clear" size="22" @click="del(sqlIndex,i)"></van-icon></span>
                    </span>
                    <span class="mission" v-text="item.mission"></span>
                </div>
                <div class="itemBottom">
                  <p class="message" v-text="item.message"></p>
                  <span class="dateFix">
                      <span class="date overflow-ellipsis" v-text="item.date"></span> <br>
                      <span class="day overflow-ellipsis" v-text="(`${item.date}(${item.day})`)==today?`今天`:`${item.day}`"></span>                </span>
                </div>
              </div>
            </div>
          </div>
          <div class="listRight listBox" >
            <div class="f-box" v-for="(items , sqlIndex) in sql" :key='sqlIndex'>
              <div v-for="(item,i) in items.todolist" :key="i" v-show="sqlIndex%2==1"  :class="item.stutas==1?'todoItem complete':'todoItem'">
                <div :class="`itemTop add${sqlIndex}`">
                    <span class="ckBtn">
                      <van-checkbox v-model="item.stutas" :checked-color="theme" @click="edit()"></van-checkbox>
                      <span class="del"><van-icon name="clear" size="22"  @click="del(sqlIndex,i)"></van-icon></span>
                    </span>
                    <span class="mission" v-text="item.mission"></span>
                </div>
                <div class="itemBottom">
                  <p class="message" v-text="item.message"></p>
                  <span class="dateFix">
                      <span class="date overflow-ellipsis" v-text="item.date"></span> <br>
                      <span class="day overflow-ellipsis" v-text="(`${item.date}(${item.day})`)==today?`今天`:`${item.day}`"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "TodoList",
  data() {
    return {
      tab:['重要 紧急','重要 不紧急','不重要 紧急','不重要 不紧急'],
      theme:'red',
      sql:[],
      show:true,
      today:this.formatDate(new Date()),
      tomorrow:this.formatDate(new Date(),1),
      nextWeek:this.formatDate(new Date(),7),
    };
  },
  created(){
      this.$store.state.vanTabbar = false
  },
  mounted(){
    if(this.$ls.get('todos')!=null){
      this.getTodo();
    }
  },
  methods: {
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
    getTodo(){
      this.sql = JSON.parse(this.$ls.get('todos'));
      let S = 0;
      if(this.sql){
        this.sql.map((item)=>{
          item.todolist.length>0 ? S=S+1:S;
        })
      }
      console.log(S);
      if(S == 0){
        this.show=true
      }else{
        this.show=false
      }
    },
    edit(){
      this.save();
    },
    del(sqlIndex,i){
      console.log(sqlIndex,i);
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认删除？',
      })
        .then(() => {
          this.sql[sqlIndex].todolist.splice(i,1);
          this.save();
          this.$toast.success('删除成功');
          this.getTodo();

        })
        .catch(() => {
          // this.$toast.success('取消成功');
        });
    },
    save(){
      this.$ls.set('todos',JSON.stringify(this.sql));
    }
  },
  destroyed(){
    // this.$store.state.vanTabbar = true
  },
  watch:{
  }
};
</script>
<style lang="scss">
  .TodoList {
    transform: translateY(-20px);
    h1 {
      text-align: center;
    }
    .van-tab__text{
      font-size: 14px;
    }
    .add0{
      background: rgba(255, 0, 0, 0.445);
    }
    .add1{
      background: rgba(255, 166, 0, 0.7);
    }
    .add2{
      background: dodgerblue;
    }
    .add3{
      background: #83dfcf;
    }

    .todoList{
      width: 94vw;
      margin: 20px auto;
      display: flex;
      justify-content: space-evenly;
      .listBox{
        width: 50%;
        display: flex;
        flex-direction: column;
        .f-box{
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
        }
        .todoItem{
          width: 94%;
          border-radius: 10px;
          background: rgba(135, 207, 235, 0.102);
          overflow: hidden;
          margin: 10px auto;
          box-shadow: 3px 3px 9px #d9d9d9,
                      -3px -3px 9px #fff;
          overflow: hidden;
          .itemTop{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            .mission{
              display: inline-block;
              box-sizing:border-box;
              padding: 0px 10px 5px 14px;
              font-size: 18px;
              letter-spacing: 3px;
              font-weight: 500;
              width: 100%;
              overflow: hidden;
              word-break: break-all;
            }
            .ckBtn{
              flex: 1;
              margin: 7px;
              display: flex;
              align-self:flex-end;
              justify-content: space-between;
              .van-icon{
                outline: none;
                margin:0 2.5px;
              }
              .del{
                .van-icon{
                  display: block;
                  width: 20px;
                  height: 20px;
                  text-align: center;
                  line-height: 20px;
                  font-size: 12px;
                  border-radius: 50%;
                  // color: #e9c46a;
                  color: #fff;
                }
              }
            }
          }
          .itemBottom{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color:#c78283;
            .message{
              width: 90%;
              overflow: hidden;
              word-break:break-all;
              margin: 10px auto;
              line-height: 20px;
            }
            .dateFix{
              position: relative;
              bottom: 5px;
              left: 0px;
              width: 70%;
              font-size: 12px;
              margin: 10px auto;
              border-radius: 20px;
              background: #eaeaea;
              box-shadow: 3px 3px 9px #d9d9d9,-3px -3px 9px #fff;
              text-align: center;
              color: #333;
              padding: 4px 8px;
              letter-spacing: 2px;
            }
          }
        }
        // .complete{
        //   filter: grayscale(100%);
        //   -webkit-filter : grayscale(100%);
        //   -moz-filter : grayscale(100%);
        //   -ms-filter : grayscale(100%);
        //   -o-filter : grayscale(100%);
        // }
      }
    }
    .page0 .van-icon{
      border: 1px solid red;
    }
    .page1 .van-icon{
      border: 1px solid rgba(255, 166, 0, 0.7);
    }
    .page2 .van-icon{
      border: 1px solid dodgerblue;
    }
    .page3 .van-icon{
      border: 1px solid #83dfcf;
    }
    .overflow-ellipsis{
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
