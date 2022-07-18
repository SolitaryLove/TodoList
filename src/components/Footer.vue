<template>
    <div class="todo-footer">
        <label>
            <input type="checkbox" :checked="isSelectAll" 
            @click="switchSelectAllState($event)">
        </label>
        <span>
            <span>已完成 {{finishedNum}}</span> / 全部 {{totalNum}}
        </span>
        <button class="btn btn-danger" @click="clearFinishedTask()">清除已完成的任务</button>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';

export default {
    name:'Footer',
    computed:{
        ...mapGetters(['finishedNum','totalNum','isSelectAll']),
    },
    methods:{
        ...mapMutations(['clearFinishedTask','switchSelectAllState']),
    }
}
</script>

<style scope>
    /*footer*/
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
</style>