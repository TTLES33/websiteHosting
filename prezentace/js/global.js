var otazky = ["Adpotace na dálku je moznost adoptovat si zvířatka", "Děti v chudých a rozvojovych zemích často nemají přístup k zakladním potrebám a trpí", "OMDC znamená organization for milions drunken children", "OMDC pomahá dětem platit studium", "Adopce na dálku prospivá nejen dětem, ale i celému státu", "při adopci na dálku se posílá pouze jednorázový příspěvek", "OMDC pomáhá pouze sirotkům", "Někdy se stává, že některým dětem bez jejich souhlasu domlouvají rodiče svatby se starými lidmi", "v Africe je pro vešechny obyvatele zajištěno bezpečí", "Africké děti se nemůžou i přes podporu začlenit do normálního života", "Byla naše prezentace výborná"];
var odpovedi = ["false", "true", "false", "true", "true", "false", "false", "true", "false", "false", "true"];
var otazka = 0;
var body = 0;
console.log(otazky);
console.log(odpovedi);
document.getElementById("points").innerHTML = body + " / " + otazka;
newotazka();
function newotazka(){
    if(otazka >= otazky.length){

        document.getElementById("otazka").innerHTML = body + " / " + otazky.length + " bodů";
        document.getElementById("actions").innerHTML = "";

    }else{
    document.getElementById("otazka").innerHTML = otazky[otazka];
}

}
function checkanswer(clicked_id){
console.log(clicked_id);
    if(clicked_id === odpovedi[otazka]){

        
        otazka++;
        body++;
        console.log(body);
        document.getElementById("otazka").style = "color: #6dff4d;";
        document.getElementById("points").innerHTML = body + " / " + otazka;
        
        document.getElementById("points").style = "font-size: 50px;";
        setTimeout(function(){ 
            document.getElementById("otazka").style = "";
            document.getElementById("points").style = "";
            newotazka();

         }, 1000);
         
    }else{
        
        otazka++;
        console.log(body);
        document.getElementById("otazka").style = "color: #ff4d4d;";
        document.getElementById("points").innerHTML = body + " / " + otazka;
        setTimeout(function(){ 
            document.getElementById("otazka").style = "";
            newotazka();
         }, 1000);
    }
  
    

}