let tittle = document.getElementById("tittle");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let categary = document.getElementById("categary");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll");
let search = document.getElementById("search");


let mood = 'create';
let tmp;
let moodSearch = "title";


function getTotle (){
    if(    price.value !=""){
    let result = (+price.value + +ads.value + +taxes.value)- +discount.value ;
total.innerHTML = result ; 
total.style.background = "#040";
}
else
{
    total.innerHTML = '';
    total.style.background = "#a00d02";
}
}

let datapro ;
if(localStorage.product != null){
    datapro =  JSON.parse(localStorage.product) 
}
else
{
     datapro =[];

}

submit.onclick = function () {
    let newpro = {
tittle:tittle.value.toLowerCase(),
price:price.value,
ads:ads.value,
discount:discount.value,
count:count.value,
categary:categary.value .toLowerCase(),
taxes:taxes.value, 
total:total.innerHTML
    }
    if (tittle.value !=''&& price.value !=''  && categary.value !='' && newpro.count < 100 ){
        if (mood ==='create'){
            if (newpro.count > 1){
                for(let i=0 ; i < newpro.count ; i++ ){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
        
            }
            clearData();

        }
        else{
            datapro[tmp] = newpro;
            mood = 'create'
            submit.innerHTML = 'create'
            count.style.display = 'block';
            clearData();

        }
    }
    
    
  
    localStorage.setItem('product' , JSON.stringify(datapro))
    displayData () ;
}
function displayData () {
    getTotle();
    let  table = ``;
    for(let i =0 ; i<datapro.length ; i++){

     table += `<tr>
<td>${i+1}</td>
<td>${datapro[i].tittle}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].categary}</td>

<td> <button onclick="updateData(${i})" id="update">update</button></td>
<td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr> `
    }
    document.getElementById("tbody").innerHTML = table;

    if(datapro.length > 0){
        deleteAll.innerHTML = ` <button onclick="deleteall()">DELETEALL(${datapro.length})</button>
        `
    }else {
        deleteAll.innerHTML = '';
    }

}
displayData () ;

function clearData () {
    tittle.value = "";
    price.value = "";
    ads.value = "";
    taxes.value = "";
    discount.value = "";
    count.value = "";
    categary.value = "";
    total.innerHTML = "";

}

function deleteData(i) {

datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro)
displayData () ;
}

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    displayData () ;
}
   function updateData(i) {
tittle.value=datapro[i].tittle;
price.value = datapro[i].price;
ads.value = datapro[i].ads;
categary.value = datapro[i].categary;
taxes.value = datapro[i].taxes;
discount.value = datapro[i].discount;
count.style.display="none";
getTotle();
submit.innerHTML = "updata"
mood = 'update'
tmp = i;
scroll({
    top:0,
    behavior:'smooth'})
   }




function getSearchMood(id)
{
    
if( id == 'searchTitle')
{
    moodSearch = 'title';
}
else
{
    moodSearch = 'category';
}
search.placeholder = 'search By '+moodSearch;
        search.focus();
        search.value = '';
        displayData () ;
}


function searchData (value){

    let table = '';
    for( let i =0 ; i < datapro.length ; i++){
if (moodSearch == "title")
{
  
if(datapro[i].tittle.includes(value.toLowerCase())){
          table += `<tr>
            <td>${i}</td>
            <td>${datapro[i].tittle}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].categary}</td>
            
            <td> <button onclick="updateData(${i})" id="update">update</button></td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> `

}
    
}
else{
   
        if(datapro[i].categary.includes(value.toLowerCase())){
        
            table += `<tr>
            <td>${i}</td>
            <td>${datapro[i].tittle}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].categary}</td>
            
            <td> <button onclick="updateData(${i})" id="update">update</button></td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> `
    }
}
    }
document.getElementById("tbody").innerHTML = table;
}