document.addEventListener('DOMContentLoaded', function () {
	var currentSection = location.pathname.split('/').filter(function (p) {
		return p
	})[0];
	if (currentSection) {
		history.replaceState(currentSection, currentSection, location.href)
		showProject(currentSection)
	}

	var buttons = document.getElementById('project-list').children;
	for (var i = 0; i < buttons.length; i++) {
		var currentButton = buttons[i]
		currentButton.addEventListener('click', showProjectMaker(currentButton.getAttribute('data-project-id')))
	}
	var logo = document.getElementById('logo');
	logo.addEventListener('click', hideProjects);

	var contact = document.getElementById('contact-button');
	contact.addEventListener('click', showProjectMaker('contact'));
	var about = document.getElementById('about-button');
	about.addEventListener('click', showProjectMaker('about'));

	var mobilebuttons = document.getElementById('mobilemenu');
	mobilebuttons.addEventListener('click', togglemenu);


});


function hideProjects() {
	var projects = document.getElementsByClassName('project-container');
	for (var j = 0; j < projects.length; j = j + 1) {
		projects[j].style.display = 'none';
	}
	isAProjectSelected = false;
}

function showProject(projectId) {
	hideProjects();
	hideMenu();
	document.getElementById(projectId).style.display = 'block';
	isAProjectSelected = true;
}

function showProjectMaker(projectId) {
	return function () {
		history.pushState(projectId, projectId, location.origin + '/' + projectId)
		showProject(projectId);
	}
}

var isMenuVisible = true;
var isAProjectSelected = false;

function togglemenu() {
	console.log(isMenuVisible)
	isMenuVisible && isAProjectSelected ? hideMenu() : showMenu();
}

function showMenu() {
	var leftPane = document.getElementsByClassName('left-pane')[0];
	var rightPane = document.getElementsByClassName('right-pane')[0];
	leftPane.classList.remove('mobile-invisible');
	rightPane.classList.add('mobile-invisible');
	isMenuVisible = true;
}

function hideMenu() {
	var leftPane = document.getElementsByClassName('left-pane')[0];
	leftPane.classList.add('mobile-invisible')
	var rightPane = document.getElementsByClassName('right-pane')[0];
	rightPane.classList.remove('mobile-invisible');
	isMenuVisible = false;
}

window.onpopstate = function (event) {
	event.state ?
		showProject(event.state) :
		hideProjects()
}