<template>
    <ul class="todo-main">
        <transition-group name="todo" appear>
            <Item v-for="tObj in todoList" :key="tObj.id" :tObj="tObj" />
        </transition-group>
    </ul>
</template>

<script>
import Item from './Item.vue';

import {mapState} from 'vuex';

export default {
    name:'List', 
    components:{Item},
    computed:{
        ...mapState(['todoList']),
    },
    watch:{
        // 数据持久化
        todoList:{
            deep:true,
            handler(value){
                localStorage.setItem('todoList',JSON.stringify(value));
            }
        }
    }
}
</script>

<style scoped>
    /*main*/
    .todo-main {
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }

    .todo-empty {
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
    /* 过渡效果 */
    .todo-enter-active{
        animation:todoAni 0.5s ease;
    }
    .todo-leave-active{
        animation:todoAni 0.5s ease reverse;
    }
    @keyframes todoAni {
        from{
            transform:translateX(100%);
        }
        to{
            transform:translateX(0px);
        }
    }
</style>