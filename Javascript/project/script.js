    let tasks = [];
    let taskNumber = 1;

    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const emptyState = document.getElementById('emptyState');
    
  window.onload = () => {
    loadTasks();
    displayTasks(tasks);
};

    addBtn.onclick = () => {
    
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        const newTask = {
            id: taskNumber,
            text: taskText
        };
        
        tasks.push(newTask);
        taskNumber++;
        
        taskInput.value = '';
        
        saveTasks();
        displayTasks(tasks);
    };

    searchInput.oninput = () => {
        const searchText = searchInput.value.toLowerCase();
        
        if (searchText === '') {
            showTasks();
            return;
        }
        
        const foundTasks = tasks.filter(task => 
            task.text.toLowerCase().includes(searchText)
        );
        
        displayTasks(foundTasks);;
    };

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        
        saveTasks();    
        displayTasks(tasks);
    }

    function displayTasks(tasksToShow) {
        taskList.innerHTML = '';
        
        if (tasksToShow.length === 0) {
            emptyState.style.display = 'block';
            return;
        }
        
        emptyState.style.display = 'none';
        
        tasksToShow.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            
            if (tasks.length > 0) {
                taskNumber = Math.max(...tasks.map(task => task.id)) + 1;
            }
        }
    }
