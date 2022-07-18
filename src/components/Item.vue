<template>
    <li>
        <label>
            <input type="checkbox" :checked="tObj.done" @click="switchState({$event,tObj})">
            <span v-show="!tObj.isEdit">{{tObj.title}}</span>
            <input type="text" v-show="tObj.isEdit" ref="inputEdit"
             :value="tObj.title" @blur="editTask({$event,tObj})">
        </label>
        <button class="btn btn-danger" @click="deleteTask(tObj.id)">删除</button>
        <button class="btn btn-danger" @click="changeTask($event)">编辑</button>
    </li>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
    name:'Item',
    props:['tObj'],
    methods:{
        ...mapMutations(['switchState','deleteTask','editTask']),
        changeTask(e){
            /* this.tObj.hasOwnProperty('isEdit')
            error Do not access Object.prototype method 'hasOwnProperty' from target obj
            原因：Vue.js启动项目会自动生成配置为与ESLint一起使用的样板no-prototype-builtins
            规则不允许Object.prototype直接从对象调用方法，所以会导致这种错误 */
            if(Object.prototype.hasOwnProperty.call(this.tObj,'isEdit')){
                this.tObj.isEdit=true;
            }else{
                this.$set(this.tObj,'isEdit',true);
            }
            this.$nextTick(function(){
                e.target.focus();
            });
            this.$nextTick(function(){
                // e.target.focus();
                this.$refs.inputEdit.focus();
            });
        }
    }
}
</script>

<style scoped>
    /*item*/
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label {
        float: left;
        cursor: pointer;
    }

    li label span {
        font-size: 14px;
    }

    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button {
        float: right;
        display: none;
        margin-top: 3px;
        display:none;
        margin-right:5px;
    }

    li:before {
        content: initial;
    }

    li:last-child {
        border-bottom: none;
    }

    li:hover button{
        display:block;
    }

    input[type="text"]{
        font-size:14px;
        outline:none;
        border:none;
        border-bottom:2px solid #da4f49;
        margin-left:-1px;
    }
</style>