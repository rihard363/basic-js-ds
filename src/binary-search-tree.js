const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {
    constructor() {
      this.origin = null;
    }


  root() { 
      return this.origin
    }
  

  add(data) {
    //создаём новый узел
    const newNode = new Node(data)
    //если корня не существует то новый узел станет корнем
    if (!this.origin) {
      this.origin = new Node(data)
    }

    //текущий узел будет равен корню
    let currentNode = this.origin;
    //тепереь проходим циклом по всем текущим узлам пока не найдём пустой и в него не положим новый узел
    while(currentNode) {
      if(newNode.data === currentNode.data) {
        return currentNode
      }

      //если значение меньше текущего то кладём его слева
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
      }

      currentNode = currentNode.left;
      //иначе кладём его справа
      } else if (newNode.data > currentNode.data) { 
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
      currentNode = currentNode.right;
      }
    };
  }
  //возвращает логическое значение true oder false при поиске узла по data
  has(data) {
    
    return searchTree(this.origin, data)
    //функция посика принимает узел и значение
    function searchTree (node, data) {
      //если узла нет то сразу ложь
      if(!node) {
        return false;
      }
      //если значение узла равно искомому то правда
      if(node.data === data) {
        return true;
      }

      if(data < node.data) {
        return searchTree(node.left, data)
      } else if(data > node.data){
        return searchTree(node.right, data)
      }
    }
  }

  find(data) 
  {
    return searchTree(this.origin, data)
    //функция посика принимает узел и значение
    function searchTree (node, data) {
      //если узла нет то сразу ложь
      if(!node) {
        return null;
      }
      //если значение узла равно искомому то правда
      if(node.data === data) {
        return node;
      }

      if(data < node.data) {
        return searchTree(node.left, data)
      } else if(data > node.data){
        return searchTree(node.right, data)
      }
    }
  }

  remove(data) 
  {
    this.origin = removeNode(this.origin, data);

    function removeNode (node, data) {
            //если узла нет то сразу ложь
      if(!node) {
        return null;
      }
      //Если значение меньше то применим эту функцию к узлу свлева и сам узел веорнём как корень (чтобы поднять его выше на уровень)
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node
      }else if (node.data < data) {
        node.right = removeNode(node.right, data); //Аналогично для правого  
        return node
      } else { //случай если значения одинаковые
        //если значение является листом 
        if (!node.left && !node.right) {
          return null 
        }

        //Если нет только одного из потомков но возвращаем противоположный 
        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }
        //Если есть оба потомка то обходим справа (ищем минимальный в правом поддереве)
          let minRightTree = node.right;
          //идём циклом до тех пор пока у правого узла есть левый потомок
          while(minRightTree.left) {
            minRightTree = minRightTree.left;
          }
          //получаем значение минимального элемента справа
          node.data = minRightTree.data;
          // применяем функцию удаления к правому узлу по минимальному значению справа
          node.right = removeNode(node.right, minRightTree.data);
          // поднимаем полученный узел
          return node;
      }
    }
  }

  min() 
  {
    if(!this.origin) {
        return null;
      }
    let minNode = this.origin;
    while (minNode.left){
      minNode = minNode.left;
    }

    return minNode.data
  }

  max() 
  {
    if(!this.origin) {
      return null;
    }
    let maxNode = this.origin;
    while (maxNode.right){
      maxNode = maxNode.right;
    }

    return maxNode.data
  }

}

module.exports = {
  BinarySearchTree
};