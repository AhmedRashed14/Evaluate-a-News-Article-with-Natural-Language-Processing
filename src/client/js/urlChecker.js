import isURL from 'validator/lib/isURL';
function checkForUrl(url) {
    console.log("::: Running checkForURL :::", url);
//if statment to decide what action is next
    if(!isURL(url)){
      return false;
    }
    else{
      return true;
    }

}

export { checkForUrl }