


/*

Написать функцию, которая будет принимать объект и копировать из него только те свойства, 
которые прописаны в условиях. Изменение этих ключей в новом объекте не должны менять значения в старом. 
Пример вызова функции 

copy(obj, ['key1.key2.key3', 'key2.key1'])

Второй аргумент функции - это массив путей, по которым нужно выполнять копирование. 

Этот аргумент может отсутствовать в объекте, например:

a = {
  b: null
}

a.b.c

Пример
const a = { b: { c: 3, d: [3, 4] }, a: 12 }
const b = copy(a, ['a.a', 'b.c', 'b.d.0', 'b.c.e'])

b = { b: { c: 3, d: [3] } }

*/

/* ответ */
function parse(arr){

  let temp = []

  for (let a of arr){

    let x = parseInt(a, 10)

    temp.push(isNaN(parseInt(a, 10)) ? a : x)

  }

  return temp
}


function rec(dst, arr, count, newobj){

  if(arr.length){

    let k = arr.shift()

    if(dst[k] === undefined) {
      return
    }
    
    let next_k = arr[0]
    if(dst[k][next_k] == undefined){
      return
    }

    count++

    if(typeof arr[0] === 'number'){
      newobj[k] = [dst[k][arr[0]]]
      return
    }

    newobj[k] = dst[k]

    rec(dst[k], arr, count, newobj[k])

  }
  
}

function copy(dst, arr){

  let parse_arr = []
  for(let a of arr){
    parse_arr.push(parse(a.split('.')))
  }

  let src = {}
  for(let pa of parse_arr){
    rec(dst, pa, 0, src)
  }

  return src
}

const a = { b: { c: 3, d: [3, 4] }, a: 12 }
const b = copy(a, ['a.a', 'a.a.a.a', 'b.c', 'b.d.0', 'b.c.e'])

console.log('Equal:', JSON.stringify(b) == JSON.stringify({ b: { c: 3, d: [3] } }))











/*
Есть компонент A, принимающий слот, внутри компонента A лежит компонент B, внутри которого компонент C. Задача - передать слот из компонента A в компонент C
Версия - Vue2
Уточнение - прокинуть слот с ограниченной областью видимости из родительского компонента в самый нижний.
Допустим есть таблица, внутри которой компонент строки, внутри которого компонент ячейки.
И в этот компонент ячейки должен передаться слот с ограниченной областью видимости из компонента таблицы.ц

RTable
  template( #cell="{ item, index }" )
	div() //то, что будет подставлять в компонент ячейки
	
ИерархияЖ 
RTable
  RRow
    RCell - внутри этого компонента использование template( #cell )

*/


/* ответ - хз, сделал как понял

##################### Компонент c
<template>
  <div class="name">
    --- Компонент С
    <slot></slot>
  </div>
</template>


##################### Компонент B
<template>
  -- Компонент B<br>
  <C>
    <slot></slot>
  </C>
</template>

<script>

import C from '@/components/C.vue'

export default {
  components: {
    'C': C,
  },
}

</script>


###################### Компонент A
<template>
  - Компонент A: {{ content }}<br>
  <B>
    <slot name="a" :content="content"></slot>
  </B>
</template>

<script>

import B from '@/components/B.vue'

import { ref } from 'vue'

export default {

  components: {
    'B': B,
  },

  setup() {

    const content = ref('asd')

    return { content }
  }
}

</script>


###################### main component
<template>
  <div class="main">
    <A>
        <template #a="{ content }">
            {{ content }}
        </template>
    </A>
  </div>
</template>


<script>

import A from '@/components/A.vue'

export default {
  components: {
    'A': A,
  },
}

</script>













/**
Реализовать функцию, которая принимает любой тип данных, и преобразовывать тип boolean (при его наличии) в числовое значение.
В качестве параметров могут быть объекты любого уровня вложенности, массивы, строки, числа и т.д.
Т.е. пример
*/

/* ответ */
function booleanToInt(type){

  switch(typeof type){

    case 'string':
      return type
    case 'number':
      return type
    case 'boolean':
      return type ? 1 : 0

    case 'object':

      if(Array.isArray(type)){

        for(let i = 0; i < type.length; i++){
          type[i] = booleanToInt(type[i])
        }

        return type

      }else{

        for (const [key, value] of Object.entries(type)) {
          type[key] = booleanToInt(value)
        }

        return type
      }

    default:
      return type
  }

}



console.log(booleanToInt(NaN))
console.log(booleanToInt('qwerty')) // 'qwerty'
console.log(booleanToInt(1)) // 1
console.log(booleanToInt(false)) // 0
console.log(booleanToInt(true)) // 1
console.log(booleanToInt([1, 'qwerty', false])) // [1, 'qwerty', 0]
console.log(booleanToInt([1, 'qwerty', { a: true }])) // [1, 'qwerty', { a: 1 }]
console.log(booleanToInt({ a: { b: true }, c: false, d: 'qwerty' })) // { a: { b: 1 }, c: 0, d: 'qwerty' }

console.log(booleanToInt({
  date1: {
    date1_1: 1,
    date1_2: [
      {
        date2_1: false,
        date2_2: 'str1',
      },
      {
        date2_3: true,
        date2_4: 'str2',
      },
      {
        date2_5: false,
        date2_6: 'str1',
      },
    ],
    date1_3: false,
    date1_4: {
      date3_1: true,
      date3_2: false,
      date3_3: 'str1',
      date3_4: 123,
    },
    date1_5: 'true',
  }
}))







