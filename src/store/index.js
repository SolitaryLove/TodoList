import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { nanoid } from 'nanoid';

const state=()=>{
    return {
        todoList:JSON.parse(localStorage.getItem('todoList'))||[],
    }
};

const getters={
    // 已完成的任务个数
    finishedNum(state){
        return state.todoList.filter((item)=>item.done===true).length;
    },
    // 所有的任务个数
    totalNum(state){
        return state.todoList.length;
    },
    // 全选任务状态
    isSelectAll(state,getters){
        return getters.finishedNum===getters.totalNum && getters.finishedNum!==0;
    }
};

const actions={
    
};

const mutations={
    // 创建任务
    createTask(state,payload){
        /* 
            payload:{
                $event,
                title
            }
        */
        if(payload.title.trim()){
            state.todoList.unshift({
                id:nanoid(),
                title:payload.title,
                done:false,
            });
        }
        payload.$event.target.value='';
    },
    // 切换任务状态
    switchState(state,payload){
        /* 
            payload:{
                $event,
                tObj
            }
        */
        state.todoList.forEach((item)=>{
            if(item.id===payload.tObj.id){
                item.done=payload.$event.target.checked;
            }
        });
    },
    // 删除任务
    deleteTask(state,payload){
        /* 
            payload:{
                tObj.id
            }
        */
        if(confirm('确定要删除该任务吗？')){
            state.todoList=state.todoList.filter(item=>item.id!==payload);
        }
    },
    // 编辑任务
    editTask(state,payload){
        /* 
            payload:{
                $event,
                tObj
            }
        */
        payload.tObj.isEdit=false;
        state.todoList.forEach((item)=>{
            if(item.id===payload.tObj.id){
                item.title=payload.$event.target.value;
            }
        });
    },
    // 清除已完成的任务
    clearFinishedTask(state){
        if(confirm('确认要清除已完成的任务吗？')){
            state.todoList=state.todoList.filter((item)=>item.done!==true);
        }
    },
    // 切换全选任务状态
    switchSelectAllState(state,payload){
        /* 
            payload:{
                $event
            }
        */
        state.todoList.forEach((item)=>{
            item.done=payload.target.checked;
        });
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});