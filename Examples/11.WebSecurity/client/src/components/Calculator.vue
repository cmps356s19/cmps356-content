<template>
    <div id="calculator">
        <h1>Calculator</h1>
        <input type="text" v-model="num1"/>
        <select id="operation" v-model="operation">
            <option>+</option>
            <option>-</option>
            <option>*</option>
            <option>/</option>
        </select>
        <input type="text" v-model="num2"/>
        <br><br>
        <input type="button" value="Compute" @click="compute" class="btn btn-primary"/>
        <br><br>
        <div id="result">{{num1}} {{operation}} {{num2}} = {{compute()}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num1: '',
                num2: '',
                operation: ''
            }
        },

        methods: {
            compute() {
                let result = NaN;
                const expression = `${this.num1}  ${this.operation}  ${this.num2}`;
                try {
                    result = eval(expression);
                } catch (e) {}
                console.log(result);
                return result;
            }
        }
    }
</script>

<style scoped>
    #operation {
        width: 40px;
        margin: 8px;
    }

    #calculator {
        text-align: center;
    }
</style>