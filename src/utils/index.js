import request from "../service/request"

function is (constructor, value) {
    return Object.prototype.toString.call(value) === '[object ' + constructor.name + ']';
}
//ES6 中参数必填的情况下默认的参数
function throwIfMissing  ()  {
    throw new Error('必须的参数并没有被传递');
}

function sortByASC(a, b){
    return a.sort - b.sort
}
// 框架树结构层级处理
function getTreeList(list,parentId) {
    let result = []
    for(let i in list){
        list[i].key = list[i].id
        list[i].title = list[i].name
        // list[i].type == "root" && 
        if (list[i].parentId === parentId){
            let children = getTreeList(list, list[i].id)
            if (children.length > 0 ){
                list[i].children = getTreeList(list, list[i].id)
            }
            result.push(list[i])
        }
    }
    return result.sort(sortByASC).reverse()
}

export default {
    is,
    throwIfMissing,
    sortByASC,
    getTreeList
}