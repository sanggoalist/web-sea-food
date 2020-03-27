export function getCatgoryLinkName(type){
    var category = "";
    if (+type === 1){
        category = "shrimp";
    } else if (+type === 2){
        category = "cm-crab";
    }
    else if (+type === 3){
        category = "squid";
    }
    else if (+type === 4){
        category = "fish";
    }
    else if (+type === 5){
        category = "other";
    }     
     else {
        category = "shrimp";
    }
    return category;

}

export function getCatgoryName(type){
    var category = "";
    if (+type === 1){
        category = "Shrimp";
    } else if (+type === 2){
        category = "Ca Mau Grab";
    }
    else if (+type === 3){
        category = "Squid";
    }
    else if (+type === 4){
        category = "Fish";
    }
    else if (+type === 5){
        category = "Other Product";
    }     
     else {
        category = "Shrimp";
    }
    return category;

}