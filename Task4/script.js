const inpBox = document.getElementById("input-box")
const list = document.getElementById("lists")

function addTask(){
	event.preventDefault()
	if(inpBox.value === ''){
		alert("Add some value")
	}
	else{
		  let li=document.createElement("li");
		  li.innerHTML = inpBox.value;
		  list.appendChild(li)
		  let span =document.createElement("span");
		  span.innerHTML = "\u00d7"
		  li.appendChild(span)
	}
	inpBox.value = ""
	saveData()
}

list.addEventListener("click", function(e){
	if(e.target.tagName === "LI"){
		e.target.classList.toggle("checked")
		saveData()
	}
	else if(e.target.tagName === "SPAN"){
		e.target.parentElement.remove()
		saveData()
	}
}, false)


function saveData(){
	localStorage.setItem("data", list.innerHTML);
}
function showTask(){
	list.innerHTML = localStorage.getItem("data")
}
showTask();