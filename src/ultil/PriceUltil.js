export function getPriceName(type){
    var category = "";
    if (+type === 1){
        category = "VND";
    } else if (+type === 2){
        category = "USD";
    }
    else if (+type === 3){
        category = "YEN";
    } 
     else {
        category = "VND";
    }
    return category;
}
export function getWeightName(type){
    var category = "";
    if (+type === 1){
        category = "kg";
    } else if (+type === 2){
        category = "gr";
    }
    else if (+type === 3){
        category = "ton";
    } 
     else {
        category = "kg";
    }
    return category;
}