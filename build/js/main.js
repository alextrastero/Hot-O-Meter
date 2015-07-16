var Person = {
    name: null,
    picUrl: null,
    getNameNode: function(){
        if( this.name ){
            var pTag = document.createElement('h3');
            pTag.innerHTML = this.name;
            return pTag;
        }
    },
    getPhotoNode: function(){
        if( this.picUrl ){
            var img = document.createElement('img');
            img.src = this.picUrl;
            return img;
        }
    }
}

var Faker = {
    data: null,
    node: null,
    init: function(node){
        this.node = node;
    },
    newRequest: function(){
        var xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                data = JSON.parse(xmlhttp.responseText);
                Faker.paintPerson(data);
            }
        }
        xmlhttp.open("GET","http://uifaces.com/api/v1/random",true);
        xmlhttp.send();
    },
    paintPerson: function(data){
        Person.name = data.username;
        Person.picUrl = data.image_urls.epic;
        node.innerHTML = '';
        node.appendChild( Person.getNameNode() );
        node.appendChild( Person.getPhotoNode() );
    },
    setupListeners: function(buttons){
        buttons.yes.addEventListener('click', function(){
            console.error('yes');
            Faker.newRequest();
        });
        buttons.no.addEventListener('click', function(){
            console.error('no');
            Faker.newRequest();
        });
    }
}

var node = document.querySelector('.image-container'),
    buttons = {
        yes: document.querySelector('.js-yes'),
        no: document.querySelector('.js-no')
    }
var faker = Object.create(Faker);
faker.setupListeners(buttons);
faker.init(node);
faker.newRequest();
