//Index.js file code.
// was copied from original file depository.


let button    = document.getElementById('toDoButton'),
    submit    = document.getElementById('submitButton'),
    imporDrop = document.getElementById('importantDropList'),
	urgentDrop= document.getElementById('urgentDropList'),	
    urgency   = "",
    toDoArr   = [],
	minorArr  = [],
	imporArr  = [],
	urgentArr = [],
    arrLength = toDoArr.length;



		console.log(document.getElementById('toDoList').hasChildNodes());
		


				//toggles the add toDo form on and off
			button.addEventListener('click', ()=>{
				createForm();
			});

		
				//adds click listener for the remove button
				document.addEventListener('click', removeListener);

				function removeListener(event){
					var element = event.target;
					if(element.classList.contains('fa-times-circle')){
						element.parentNode.remove();
						let toDoTask = element.parentNode.textContent.replace(/[\n\r]+|[\s]{2,}/g,'').trim();
						compareText(toDoTask);
						if(document.getElementById('emailForm').style.display === 'block'){
						document.getElementById('emailForm').style.display = 'none'
					}
					}
					
				};
				
				//click listener to the drop down list

				document.addEventListener('pointerdown', pointerDownItem);
				//lightens li shadow to indicate being selected
				function pointerDownItem(){
					var dropDownItem = event.target;
					if(event.target.classList.contains('dropDownList')){
						dropDownItem.style.boxShadow = '3px 3px 1px black';
					}
					
				};
				document.addEventListener('pointerup', pointerUpItem);
				//reverts li back to original shadow effect
				function pointerUpItem(){
					var dropDownItem = event.target;
					if(event.target.classList.contains('dropDownList')){
						dropDownItem.style.boxShadow = '10px 10px 5px black';
					}
					
				};

				
				
				//adjusts the task items appended to the list,
				//shadow box to indicate being clicked 
				function onMouseDown(){
					document.getElementById('toDoItem').style.boxShadow = 'box-shadow: 10px 10px 5px black';
					
				};
				
				//function compares if the main task in the middle of the scree,
				// matches any items sorted in the urgency option, and deletes
				//it if they match
				function compareText(toDoTask){
					
					
					const minorUlList = (toDoTask) =>{
					
					let minorUl       = document.getElementById('minorList');
					let minorDropList = minorUl.getElementsByTagName('li');
					for(let i =0; i < minorDropList.length; i++){
						let text = minorDropList[i].textContent.replace(/[\n\r]+|[\s]{2,}/g,'').trim();
						if(text === toDoTask){
							
							minorUl.removeChild(minorDropList[i]);
						}
					}
					};
					minorUlList(toDoTask)
					
					const importUlList = (toDoTask) =>{
						let importantUl        = document.getElementById('importantList');
						let importDropDownList = importantUl.getElementsByTagName('li');
						for(let i =0; i < importDropDownList.length; i++){
							let text = importDropDownList[i].textContent.replace(/[\n\r]+|[\s]{2,}/g,'').trim();
							if(text === toDoTask){
								importantUl.removeChild(importDropDownList[i]);
							}
						}
						
					};
					importUlList(toDoTask);
					
					const urgentUlList = (toDoTask) =>{
						let urgentUl           = document.getElementById('urgentList');
						let urgentDropDownList = urgentUl.getElementsByTagName('li');
						for(let i =0; i < urgentDropDownList.length; i++){
							let text = urgentDropDownList[i].textContent.replace(/[\n\r]+|[\s]{2,}/g,'').trim();
							if(text === toDoTask){
								urgentUl.removeChild(urgentDropDownList[i]);
							}
						}
						
					};
					urgentUlList(toDoTask);
					
				};
			

		//adds click listener to submit button.
		// assures list of tods stops at 6.
		submitButton.addEventListener('click', () =>{
				toDoArr.push(storeToDos(urgency));
				var toDo = toDoArr[arrLength];
				var objTitle   = `${toDo.title}`;
				var objUrgency = `${toDo.urgency}`;	
				var obj  = ` ${toDo.title}`;
				insertToDos(obj);
				addTaskToList(objTitle, objUrgency);
				arrLength++;
			});


		

		//button listener for urgent buttons.
		//creates an array of the three buttons,
		// then assigns them a click listener.
		(function urgent(){
			let minor     = document.getElementById('verticalOne');
			let important = document.getElementById('verticalTwo');
			let urgent    = document.getElementById('verticalThree');
			var buttonArr = [
						minor,
						important,
						urgent
						];

				buttonArr.forEach(function(button, index){
					button.addEventListener('click', ()=>{
						 urgency = urgentValues(index);
					});
				});		
		})();



		//insetToDos.js file

	function insertToDos(object){
	
		const addTask = (object) =>{
			
			//appends the newly created object 
			let list    = document.getElementById('toDoList')
			let li      = document.createElement("li");
			if(list.hasChildNodes()){
			list.removeChild(list.childNodes[0]);
			};
			li.setAttribute('id', 'toDoItem');
			li.innerHTML = ` <i id='textIcon'title='Send email reminder'class="envelope icon"onclick='enterEmail();'></i><i id='close'class="fas fa-times-circle"></i>  
				 <span id='objTitle'>${object}</span>
				`;
			list.appendChild(li);		
			};
			addTask(object);
			
			

	};	

	
		

// list.js original files
function createForm() {

var form = document.getElementById('formDiv');
		
			if(form.style.display !== 'none'){
				console.log('clicked')
				form.style.display = 'none';
			}
			else {
				
				form.style.display = 'block';
			}


};
	function enterEmail(){
		var emailStyle = document.getElementById('emailForm');
		if(emailStyle.style.display === 'none'){
			emailStyle.style.display = 'block';
			
		}
		else {
			emailStyle.style.display = 'none';
		}
		
	};
	


//storeToDos.js original file
function storeToDos(urgentValue){

	//this function retrieves all form values 
	//in preparation to store them
	const getInputValues = () =>{

	let description = document.getElementById('description');
	let urgency     = document.getElementById('urgency');
	};

	//function handles setting the values from the text boxes
	//as well as creating a new ToDo object when called
	const createTodo = () =>{
		
		getInputValues();
		let title = document.getElementById('titleInput');
		

		function ToDo(title, urgency) {
					this.title       = title;
			        this.urgency     = urgency;
					
		}
			
		urgency 	  = urgentValue;
		var toDos     = new ToDo(title.value, urgency);
		return toDos;
	};
	
		return createTodo();
};

//function clears input once the submit button has been clicked
function clearInputs(){
	//array is filled with the HTML ids of the input value fields
	//array loops through each id,resets the value to empty string
		var inputIds = [
				titleInput,
				urgency,
				            ];

			inputIds.forEach(function(id){
					id.value = '';
			});
};





//urgenButtons.js original file

//this function assigns the urgency button a value.
//
function urgentValues(index){
	var minor       = document.getElementById('verticalOne'),
		  important = document.getElementById('verticalTwo'),
		  urgent    = document.getElementById('verticalThree');

		  	//highlights or darkens selected urgent button
	const setUrgentColors = (index) =>{
		  	if      (index === 0) {
		  		minor.style.background = "rgba(33, 186, 96, 1)";
		  		resetColors(index);
		  	}
		  	else if (index ===1) {
		  		important.style.background = "rgba(251, 189, 8, 1)";
		  		resetColors(index);
		  	}

		  	else {
		  		urgent.style.background = "rgba(219, 40, 40, 1)";
		  		resetColors(index);
		  	}
						  
		  		
		 };
		 // resets urgent colors after click.
		 //so if one color was highlighted, selecting a different option
		 // will deselect another. 
		 const resetColors = (index) => {
		 	if      (index === 0 ) {
		 		important.style.background = "rgba(251, 189, 8, 0.5)";
		 		urgent.style.background = "rgba(219, 40, 40, 0.5)";
		 	}
		 	else if (index === 1) {
		 		minor.style.background = "rgba(33, 186, 96, 0.5)";
		 		urgent.style.background = "rgba(219, 40, 40, 0.5)";
		 	}
		 	else if (index === 2){ 
		 		important.style.background = "rgba(251, 189, 8, 0.5)";
		 		minor.style.background = "rgba(33, 186, 96, 0.5)";
		 	}

		 };
		//sets the urgency of the object toDo constructor
		const getButtonIndex = (index) =>{
			let urgency = "";
				if     (index === 0 ){
					urgency = 'Minor';
					setUrgentColors(index);
					
				}
				else if(index === 1 ){
					urgency = 'Important';
					setUrgentColors(index);
				}
				else if(index === 2 ){
					urgency = 'Urgent';
					setUrgentColors(index); 
				}
				return urgency;
		};
		        return getButtonIndex(index);

		



};

	
	//this section covers the functions pertaining to the clipboard,
	//functionality.
	//function is to show lists from list button (clipboard)
	function showLists(){
		if(document.getElementById('myListDropDown').style.display === 'none'){
			document.getElementById('myListDropDown').style.display = 'block';
			// document.getElementById('profileLogin').style.display = 'none';
		}
		else {
			document.getElementById('myListDropDown').style.display = 'none';
			
		}
		
			
			
	};
//this function will be for the user to login in with.
	// their email address will be deafulted for the email reminder
	
// 	function userLogin(){
// 		if(document.getElementById('profileLogin').style.display === 'block'){
// 			document.getElementById('profileLogin').style.display = 'none';
// 		}
// 		else{
// 			document.getElementById('profileLogin').style.display = 'block';
// 			//turns off dropdown list
// 			document.getElementById('myListDropDown').style.display = 'none'
// 		}
		
		
// 	};
	

	//function is to be used with submit button only.
		    // so when submit is called it will automatically show you ,
			// what list your task was placed on.
			function submitList(){
				document.getElementById('myListDropDown').style.display = 'block';
			};


	//function will add the created list to appropriate list
	function addTaskToList(objTitle, objUrgency){
				assignTasks();
				let li        = document.createElement("li");
				li.setAttribute('class', 'dropDownList');
				li.innerHTML  = `${objTitle}<i id='closeLi'class="fas fa-times-circle"></i>`;
				sortTask(objUrgency, li);
		};

	// function is to sort which dropdown list, 
	// the new task gets sorted to appropriate list based
	// on urgency
	function sortTask(objUrgency, li){
				assignTasks();
				li.id = 'urgencyDropDown';
				if		(objUrgency === 'Minor'){
					minorList.appendChild(li);	
					minorArr.push(li);
				}
				else if (objUrgency === 'Important'){
					importantList.appendChild(li);
					imporArr.push(li);
				}
				else if (objUrgency === 'Urgent'){
					urgentList.appendChild(li);
					urgentArr.push(li);
				}
				else {
					alert('Please select a Level Of Urgency')
				}
	};

	//function assigns dropdown lists to variables
	function assignTasks(){
				let minorList     = document.getElementById('minorList');
				let importantList = document.getElementById('importantList');
				let urgentList    = document.getElementById('urgentList');
	};


	//submit add form without page refresh
	const $form = $('#toDoForm');
	$form.on('submit', post)
	function post(e){
		 e.preventDefault();
			console.log($('#userEmail').val())
			$.ajax ({
				   type: 'POST',
				   url: '/' ,
				   data: {
					   title   : $('#titleInput').val(),
					   email   : $('#userEmail').val(),
				       time    : $('#appt').val(),
					   urgency : urgency,
				   }, 
				   dataType: 'json',
				   })
			clearInputs();
				   
			return false;
	};

	//email reminder form
	//will take users email address and send an email,
	//at the given time
	// const $emailSubmit = $('emailReminder');
	// $emailSubmit.on('submit', post)
	// function post(e){
	// 	e.preventDefault();
		
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: '/',
	// 		data: {
	// 			email: $('userEmail').val(),
	// 			time: $('appt').val()
	// 		},
	// 		dataType: 'json',
	// 	})
	// 	return false;
	// };
	
	
	
	
	
