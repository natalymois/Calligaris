 /* Верхнее меню */
 var ats = document.getElementById("topSandwich"); // topSandwich == a.sandwich-arrow
 var topSubM = document.getElementById("nav_1"); //nav_1 == sub-menu 
 
 /*Ширины блока основной навигации ( внутреннего контейнера) и ее первого раздела, являющегося основой выпадающего меню, заносим в переменные*/
 var nav = document.getElementById("nav");
 var navW = nav.clientWidth;
 
 var containerW = nav.querySelector('.container').clientWidth;
 var atsWidth = ats.clientWidth;
 
 /* Создаем функцию, которая работает при клике на a.sandwich-arrow */
 function myFunction() { 
   if (topSubM.className === "sub-menu") {
       topSubM.className += " responsive";
   } else {
       topSubM.className = "sub-menu";
   }
   
   /*if (ats.className === "sandwich-arrow") {
       ats.className += " responsive";
   } else {
       ats.className = "sandwich-arrow";
   }*/
 };
 
 /* Нижнее меню */
 var navBottom = document.getElementById('navBottom'); // navBottom == ul.nav-bottom
 var subLi = navBottom.getElementsByClassName('sub-li');
	
 var botMenu = document.getElementById('botMenu');  // botMenu == hidden-bottom-menu > a.mobi-hover - cсылка на субменю в мобильной версии
 var botSubMenu = document.getElementById("nav_2"); //nav_2 == ul.bottom-sub-menu 
 
 var mediaSubLi = botSubMenu.getElementsByClassName('media-sub-li');
	
 /* Создаем переменные, равные нужным нам значениям ширины вложенных блоков */
	var topSubWidth = navW/2;
	
	
	/* Прописываем анимацию (смену стилей при кликах) выпадающего меню для десктопной версии */
	
	if (window.innerWidth > 820) {
		
		for (let i = 0; i < subLi.length; i++) {
			var subLiA = subLi[i].querySelectorAll('a')[0];
			
			subLiA.onclick = function(){				
				this.classList.toggle('open');								
			}
		}
	}
	
	/* Прописываем анимацию (смену стилей при кликах) выпадающего меню для мобильной версии */
	
	if (window.innerWidth <= 820){	
	
		/* устанавливаем ширину подменю в зависимости от ширины окна: */
		if(window.innerWidth >= 520) {
			topSubM.style.width = topSubWidth + "px";
			botSubMenu.style.width = topSubWidth + "px";  /* Ширина выпадающего bottom-sub-menu */
		}
		if(window.innerWidth < 520) {
			topSubM.style.width = containerW * 0.85 + "px";
			botSubMenu.style.width = containerW * 0.85 + "px";  /* Ширина выпадающего bottom-sub-menu */
		}
	
		ats.onclick = function() {		
			/*for (let i = 0; i < child_A.length; i++) {			
				child_A[i].classList.remove('open');			
			}*/			
			topSubM.classList.toggle('responsive');	
			ats.classList.toggle('open');
		};
		
		botMenu.onclick = function() {
			botSubMenu.classList.toggle('responsive');
			botMenu.classList.toggle('open');
		}		
		
		for (let i = 0; i < mediaSubLi.length; i++) {
			
			var mediaSubLiA = mediaSubLi[i].querySelectorAll('a')[0];
			mediaSubLiA.onclick = function(){				
				this.classList.toggle('open');								
			}
		}

	}