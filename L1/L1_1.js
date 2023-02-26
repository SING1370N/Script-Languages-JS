const R = require('ramda');

class Pair {
    constructor(fst, snd){
        if (this instanceof Pair) {
            if (Array.isArray(fst) && fst.length === 2 && typeof snd == 'undefined') {
                this[0] = fst[0];
                this[1] = fst[1];
            } else {
                this[0] = fst;
                this[1] = snd;
            }
            this.length = 2;
        } else { return new Pair(fst, snd); }}

    get fst(){ return this[0]; }
    get snd(){ return this[1]; }

    // статичний метод (функція) of, який повертає пару зі значень
    static of(fst, snd){ return new Pair(fst,snd); }

    // статичний метод (функція) fst, який повертає fst з класу
    static fst(pair){ return pair.fst; }
    // статичний метод (функція) snd, який повертає snd з класу
    static snd(pair){ return pair.snd; }
}

a = new Pair(2,3);
if ((a.fst !==2) || (a.snd !==3)) {console.log("Error, Pair does not works as needed")}
b = new Pair(a,a);
if ((b.fst.snd !==3) || (b.snd.fst !==2)) {console.log("Error, Pair does not works as needed")}

// let zipped = R.zip(["a", "b", "c", "d", "e", "f", "g"], [1, 2, 3, 4, 5, 6, 7]);
// console.log(zipped);
//
// let zipped_pairs = R.map(Pair.of, zipped);
// console.log(zipped_pairs);
// console.log(R.map(Pair.snd, zipped_pairs)) //map example
// console.log(R.map(pair=>pair.snd, zipped_pairs))
// console.log(R.filter(p=>Pair.snd(p) !==3, zipped_pairs)) //filter example (now we have a
// let no_third = R.filter(p => Pair.snd(p) !== 3, zipped_pairs);
// console.log(R.reduce((acc, el)=>acc+Pair.fst(el),"", no_third)) //reduce example - we c
// console.log(R.reduce((acc, el)=>acc+Pair.snd(el),0, no_third))

// // LAB 1 - 2

class Knife extends Pair {
    constructor(model, price, tree_type, steel_type){
        super(model, price);
        this.knife = new Pair(new Pair(model, price), new Pair(tree_type, steel_type));
    }

    // get
    get model(){ return this.knife.fst.fst; }
    get price(){ return this.knife.fst.snd; }
    get tree_type(){ return this.knife.snd.fst; }
    get steel_type(){ return this.knife.snd.snd; }

    // static
    of(model, price, tree_type, steel_type){ return new Knife(model, price, tree_type, steel_type); }
    static model(knife){ return knife.fst.fst; }
    static price(knife){ return knife.fst.snd; }
    static tree_type(knife){ return knife.snd.fst; }
    static steel_type(knife){ return knife.snd.snd; }
}

a = new Knife("K1", 158, "Бук", "К1")
console.log(" --- NEW Knife ---")
console.log("Model: ", a.model)
console.log("Price: ", a.price)
console.log("Tree type: ", a.tree_type)
console.log("Steel type: ", a.steel_type)

a1 = new Knife("K2", 206, "Дуб", "ФС1")
a2 = new Knife("K3", 115, "Горіх", "ТК12")
a3 = new Knife("K4", 108, "Береза", "К05")
a4 = new Knife("K5", 1000, "Червоний дуб", "Титан")

const array = [a, a1, a2, a3, a4];

console.log("\n\nУсі ножі (FULL): ");
array.forEach(knife => console.log(knife));


console.log("\n\nУсі ножі (Min): ");
array.forEach(knife => console.log("------------------\nModel: ", knife.model, "\nPrice: ", knife.price));

console.log("\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n")

// відфільтрувати об'єкти зі створеного списку за певною ознакою (на вибір студента)
// За ціною

max_array = R.filter(k => k.price >= 200, array)
min_array = R.filter(k => k.price <= 200, array)

console.log("\n\nУсі ножі (Max price): ");
max_array.forEach(knife => console.log("------------------\nModel: ", knife.model, "\nPrice: ", knife.price))
console.log("\n\nУсі ножі (Min price): ");
min_array.forEach(knife => console.log("------------------\nModel: ", knife.model, "\nPrice: ", knife.price))



console.log("\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n")
// порахувати середнє значення для поля з числовим значенням, та середню або максимальну кількість літер для рядкового поля

let full_money = 0
array.forEach(knife => full_money += knife.price)
console.log("Усі ціни за рахунок forEach: ", full_money)
console.log("Усі ціни за рахунок R.reduce: ", R.reduce((acc, el)=>acc+Pair.snd(el), 0, array))

console.log("\nУсі літери (модель) за рахунок R.reduce: ", R.reduce((acc, el)=>acc+Pair.fst(el),"", array))
console.log("Скільки літер (модель) за рахунок R.reduce: ", R.reduce((acc, el)=>acc+Pair.fst(el),"", array).length)

let full_abc = ""
array.forEach(knife => full_abc += knife.model)
console.log("\nУсі літери (модель) за рахунок forEach: ", full_abc)
console.log("Скільки літер (модель) за рахунок forEach: ", full_abc.length)
