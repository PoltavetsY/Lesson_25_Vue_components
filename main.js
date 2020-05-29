Vue.component('diagrams', {
    data() {
        return {
           items: [
                {name: 'b1', color: 'red', value: 100},
                {name: 'b2', color: 'orange', value: 120},
                {name: 'b3', color: 'yellow', value: 150},
                {name: 'b4', color: 'green', value: 220},
                {name: 'b5', color: 'blue', value: 300},
                {name: 'b6', color: 'darkblue', value: 200},
                {name: 'b7', color: 'purple', value: 250}
           ]
        }
    },
    methods: {
        // changeHeight(inputValue) {
        //     // console.log(inputValue);
        //     item.value = inputValue;
        //     console.log(item.value);
        // }
    },
    template: `
        <div class="diagrams">
            <block 
                v-for="item in items" 
                :name="item.name" 
                :color="item.color" 
                :value="item.value">
            </block>
        </div>
    `
});

Vue.component('block', {
    props: {
        name: String,
        color: String,
        value: Number
    },
    data () {
        return {
            css: {
                obj: {
                    backgroundColor: this.color,
                    height: this.value + 'px'
                }    
            }
        }
    },
    methods: {
        rangeValue(inputValue){
            this.value = +inputValue;
        }
    },
    // created() {
    //     console.log(this.color, 'color');
    // },
    template: `
        <div class="diagram-item"> 
            <div class="block" v-bind:style="css.obj">{{name}}</div>
            <range @setValue="rangeValue" v-model="this.value"></range>
        </div>
    `
});

Vue.component('range', {
    props: {
        value: Number 
        // ?
    },
    data() {
        return {

        }
    },
    methods: {
        onRange(value) {
            console.log(value);
            this.$emit('setValue', value);
        }
    },
    template: `
        <input type="range"  min="100" max="300" 
        v-model="value" 
        @input="onRange(value)">
    `
});

const vm = new Vue({
    el: '#app'
}); 