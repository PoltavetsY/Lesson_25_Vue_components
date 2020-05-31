Vue.component('diagrams', {
    data() {
        return {
            items: [
                {name: 'b1', color: 'red', value: 100},
                {name: 'b2', color: 'orange', value: 120},
                {name: 'b3', color: 'yellow', value: 150},
                {name: 'b4', color: 'green', value: 220},
                {name: 'b5', color: 'dodgerblue', value: 300},
                {name: 'b6', color: 'blue', value: 200},
                {name: 'b7', color: 'rebeccapurple', value: 250}
            ]
        }
    },
    methods: {
        setValue(value){
            return value;
        },
    },
    mounted() {
        if(localStorage.getItem('items')) {
            this.items = JSON.parse(localStorage.getItem('items'));
        }
    },
    updated () {  
        localStorage.setItem('items', JSON.stringify(this.items) );
    },
    template: `
        <div class="diagram">
            <buttonSort
                @setItem="sortDiagram"
                :items="items"> 
            </buttonSort>
            <div class="diagramItem" v-for="item in items">
                <div class="block" 
                    v-bind:style="{ backgroundColor: item.color, height: item.value + 'px'}">
                        {{ item.name }}
                </div>
                <range
                    :item="item" 
                    :value="setValue(item.value)">
                </range>
            </div>
        </div>
    `
});

Vue.component('range', {
    props: {
        item: Object
    },
    methods: {
        onRange(value) {
            this.$emit('setValue', value);
        },
    },
    template: `
        <input type="range" min="100" max="300"
            v-model.number="item.value" 
            @input="onRange(item.value)">
    `
});

Vue.component('buttonSort', {
    props: {
        items: Array
    },
    data () {
        return {
            buttonName: "Sort Up"
        }
    },
    methods: {
        sortDiagram(items) {
            items.sort(function (a, b) {
                return a.value - b.value;
            });
        }
    },
    template: `
        <button @click="sortDiagram(items)">
            {{ buttonName }}
        </button>
    `
});

const vm = new Vue({
    el: '#app'
}); 