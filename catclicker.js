var model = {
    currentCat: null,
    cats: [
        {
            clickCount: 0,
            name: 'Kitty1',
            imgSrc: 'cat1.jpg',
        },
        {
            clickCount: 0,
            name: 'Kitty2',
            imgSrc: 'cat2.jpg',
        },
        {
            clickCount: 0,
            name: 'Kitty3',
            imgSrc: 'cat3.jpg',
        },
        {
            clickCount: 0,
            name: 'Kitty4',
            imgSrc: 'cat4.jpg',
        },
        {
            clickCount: 0,
            name: 'Kitty5',
            imgSrc: 'cat5.jpg',
        },
    ]
};

var octopus = {
    init: function()
    {
        model.currentCat = model.cats[0];
        viewList.init();
        viewCat.init();
        viewAdmin.init();
    },
    getCurrentCat: function()
    {
        return model.currentCat;
    },
    getCats: function()
    {
        return model.cats;
    },
    setCurrentCat: function(cat)
    {
        model.currentCat = cat;
    },
    incrementCounter: function()
    {
        model.currentCat.clickCount++;
        viewCat.render();
    },
    updateCatWithAdmin: function()
    {
        model.currentCat.name = viewAdmin.adminNameElem.value;
        model.currentCat.imgSrc = viewAdmin.adminImgSrcElem.value;
        model.currentCat.clickCount = viewAdmin.adminCickCountElem.value;
        viewList.render();
        viewCat.render();
        viewAdmin.render();
        viewAdmin.closeAdminView();
    }
};

var viewList = {
    init: function()
    {
        this.catList = document.getElementsByClassName('sidenav')[0];
        this.render();
    },
    render: function()
    {
        var cat, elem, i;

        var cats = octopus.getCats();

        this.catList.innerHTML = '';

        for (i = 0; i < cats.length; i++)
        {
            cat = cats[i];

            elem = document.createElement('a');
            elem.setAttribute('href', '#');
            elem.innerHTML = cat.name;
            elem.addEventListener('click', (function(catCopy) {
                return function(){
                    octopus.setCurrentCat(catCopy);
                    viewCat.render();
                }
            })(cat), false);

            this.catList.appendChild(elem);
        }
    }
};

var viewCat = {
    init: function()
    {
        this.catNameElem = document.getElementById('name');
        this.imgSrcElem = document.getElementById('imgSrc');
        this.countElem = document.getElementById('clkCnt');
        this.adminButtonElem = document.getElementById('admin');
        this.imgSrcElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });
        this.adminButtonElem.addEventListener('click', function(){
            viewAdmin.render();
            viewAdmin.openAdminView();
        });

        this.render();
    },
    render: function(showCat)
    {
        var currentCat = octopus.getCurrentCat();
        this.countElem.innerHTML = currentCat.clickCount;
        this.catNameElem.innerHTML = currentCat.name;
        this.imgSrcElem.src = currentCat.imgSrc;
    }
};

var viewAdmin = {
    init: function()
    {
        this.adminNameElem = document.getElementById('adminName');
        this.adminImgSrcElem = document.getElementById('adminImgSrc');
        this.adminCickCountElem = document.getElementById('adminClickCnt');
        this.adminSubmitElem = document.getElementById('adminSubmit');
        this.adminCancelElem = document.getElementById('adminCancel');
        this.adminSubmitElem.addEventListener('click', function(){
            octopus.updateCatWithAdmin();
        });
        this.adminCancelElem.addEventListener('click', function(){
            viewAdmin.closeAdminView();
        });
        this.closeAdminView();
    },
    render: function()
    {
        var currentCat = octopus.getCurrentCat();
        this.adminNameElem.value = currentCat.name;
        this.adminImgSrcElem.value = currentCat.imgSrc;
        this.adminCickCountElem.value = currentCat.clickCount;
    },
    closeAdminView: function()
    {
        this.adminNameElem.style.display = "none";
        this.adminImgSrcElem.style.display = "none";
        this.adminCickCountElem.style.display = "none";
        this.adminSubmitElem.style.display = "none";
        this.adminCancelElem.style.display = "none";
    },
    openAdminView: function()
    {
        this.adminNameElem.style.display = "block";
        this.adminImgSrcElem.style.display = "block";
        this.adminCickCountElem.style.display = "block";
        this.adminSubmitElem.style.display = "block";
        this.adminCancelElem.style.display = "block";
    }
}

octopus.init();