const tasks = {
  tasks: [
    {
      text: 'Grocery shopping',
      completed: true,
    },
    {
      text: 'Clean yard',
      completed: true,
    },
    {
      text: 'Film course',
      completed: false,
    },
  ],
  getTaskToDo() {
    // console.log(tasks.tasks);
    return this.tasks.filter((task) => task.completed === true);
  },
};

console.log(tasks.getTaskToDo());
