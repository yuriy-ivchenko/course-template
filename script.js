let courseData = null;

document.addEventListener("DOMContentLoaded", () => {
  fetch("course.json")
    .then(response => response.json())
    .then(data => {
      courseData = data;
      showCourseTitle(data);
      renderModules(data.modules);
      renderModuleTopics(0); // показати перший модуль
    });
});

function showCourseTitle(data) {
  document.getElementById("course-title").textContent = data.courseTitle;
}

function renderModules(modules) {
  const nav = document.getElementById("module-list");
  nav.innerHTML = "";
  modules.forEach((mod, index) => {
    const btn = document.createElement("button");
    btn.textContent = mod.title;
    btn.onclick = () => renderModuleTopics(index);
    nav.appendChild(btn);
  });
}

function renderModuleTopics(index) {
  const module = courseData.modules[index];
  document.getElementById("module-title").textContent = module.title;

  const topicsList = document.getElementById("topics-list");
  topicsList.innerHTML = "";

  (module.topics || []).forEach(topic => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${topic.title}</strong>${topic.details ? ` — ${topic.details}` : ""}`;
    topicsList.appendChild(li);
  });
}
