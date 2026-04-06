const addbtn = document.getElementById("addbtn");
const task_list = document.getElementById("task_list");
const remaining_msg = document.getElementById("remaining_msg");
const clear_comp_btn = document.getElementById("clear_comp_btn");
const input = document.getElementById("task_input");
const reset_btn = document.getElementById("reset_btn");
const perso_filter = document.getElementById("perso_filter");
const study_filter = document.getElementById("study_filter");
const work_filter = document.getElementById("work_filter");
const container = document.querySelector('.category_container');
const category_btn = document.getElementById("category_btn");

let tasks = [];
let cur_filtre = "all";
let cur_category = "personal";
let pre_category;
let cur_date = Date.now();

function render_tasks (){
    let tasksToRender;
    category_btn.textContent = "# "+ cur_category;
    task_list.innerHTML = "";

    if (cur_category === "all"){
        tasksToRender = tasks;
    }else{
        tasksToRender = tasks.filter(t => t.category === cur_category);
    }

    let remaining = tasksToRender.filter(t => t.completed === false).length;
    if (remaining === 0){
        remaining_msg.textContent = "No tasks yet"
    }else{
        remaining_msg.textContent = remaining + " tasks remaining";
    }

    if (cur_filtre === "all"){
        tasksToRender = tasksToRender;
    }else if (cur_filtre === "completed"){
        tasksToRender = tasksToRender.filter(t => t.completed === true);
    }else{
        tasksToRender = tasksToRender.filter(t => t.completed === false);
    }

    tasksToRender.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        span.textContent = task.text;

        if(task.deadline <= cur_date && task.deadline !== 0){
            span.style.color = 'red';
        }

        checkbox.addEventListener('change', (e) => {
                task.completed = e.target.checked;
                update_state();
        })

        if (task.completed){
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
            checkbox.disabled = true;
        }

        const deletbtn = document.createElement("button");
        deletbtn.textContent = "Delete";

        deletbtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            update_state();
        }

        const task_mod = document.createElement("div");
        const showbtn = document.createElement("button");

        showbtn.textContent = '>';
        task_mod.className = "modes";

        showbtn.onclick = () => {
            task_mod.classList.toggle('show');    
        }

        const modifybtn = document.createElement("button");
        modifybtn.textContent = "Modify";
        let on = false;

        modifybtn.onclick = () => {
            if (!on && task.completed === false){
                on = true;
                const modify_input = document.createElement("input");
                modify_input.value = task.text;
                li.appendChild(modify_input);

                modify_input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter'){
                        if(e.target.value != ""){
                            task.text = e.target.value;
                        }else{
                            window.alert("PLS enter a task first (string!!)");
                        }
                        li.removeChild(modify_input);
                        on = false;
                        update_state();
                    }
                })
            }
        }

        const set_duebtn = document.createElement("button");
        set_duebtn.textContent = "Set Due"

        set_duebtn.onclick = () => {
            if(!on && task.completed === false){
                on = true;
                const due_input = document.createElement("input");
                due_input.type = "date";
                li.appendChild(due_input); 

                due_input.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter'){
                        const due_time = new Date(e.target.value).getTime();
                        if (due_time < cur_date){
                            window.alert("Enter a valid date!!");
                        }else{
                            task.deadline = due_time;
                        }
                        li.removeChild(due_input);
                        on = false;
                        update_state();
                    }
                })
            }
        }

        task_list.appendChild(li);
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deletbtn);
        li.appendChild(showbtn);
        showbtn.appendChild(task_mod);
        task_mod.appendChild(modifybtn);
        task_mod.appendChild(set_duebtn);
    })

}

function filterAll (){
    cur_filtre = "all";
    update_state();
}
function filterComp (){
    cur_filtre = "completed";
    update_state();
}
function filterAct (){
    cur_filtre = "active";
    update_state();
}

function change_category (){
    container.classList.toggle('show');
}

function unshow_category_list(){
    container.classList.remove('show');
}

function change_to_all (){
    pre_category = cur_category;
    cur_category = "all";
    unshow_category_list();
    update_state();
}
function change_to_perso (){
    cur_category = "personal";
    unshow_category_list();
    update_state();
}
function change_to_work (){
    cur_category = "work";
    unshow_category_list();
    update_state();
}
function change_to_study (){
    cur_category = "study";
    unshow_category_list();
    update_state();
}

function add_to_list (){
    let task = input.value.trim();
    let task_id = Date.now();
    let due_time = 0;

    if (task === ""){
        window.alert("PLS enter a task first (string!!)");
        return;
    }

    if(cur_category === "all"){cur_category = pre_category;}

    tasks.push({ 
        id: task_id,
        text: task,
        completed: false,
        category: cur_category,
        deadline: due_time
    });

    update_state();

    input.value = "";
}

input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){
            let task = e.target.value
            let task_id = Date.now();
            let due_time = 0;

            if (task === ""){
                window.alert("PLS enter a task first (string!!)");
                return;
            }

            if(cur_category === "all"){cur_category = pre_category;}

            tasks.push({ 
                id: task_id,
                text: task,
                completed: false,
                category: cur_category,
                deadline: due_time,
            });

            update_state();

            input.value = "";
        }
})

function clear_comp (){
    tasks = tasks.filter(t => !(t.completed && t.category === cur_category));
    update_state();
}

function reset (){
    if (cur_category === "all"){
        tasks = [];
    }else{
        tasks = tasks.filter(t => t.category != cur_category);
    }
    
    update_state();
}

function save_tasks (){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load_tasks (){
    const stored = localStorage.getItem("tasks");

    if (stored){
        tasks= JSON.parse(stored);
    }
}

function update_state (){
    save_tasks();
    render_tasks();
}

load_tasks();
render_tasks();