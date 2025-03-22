import { name } from './../node_modules/ci-info/index.d';
import express from "express"
import { AppDataSource } from "../db/db.config.js"
import { Task } from "../db/Entities/Task.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:4200",  // Allow Angular frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));


const taskRepository = AppDataSource.getRepository(Task)
//posting a new task

app.post("/api/v1/newTask", async (req, res) => {
  try {
    if (!req.body.title || !req.body.duration) {
      res.status(400).json({ message: "Title and duration are required" });
      return
    }

    const task = await taskRepository.create({
      title: req.body.title,
      duration: req.body.duration
    });
    await taskRepository.save(task);
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }

})


//getting all the tasks
app.get("/api/v1/getTasks", async (req, res) => {
  try {
    const tasks = await taskRepository.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

//update the task
app.put("/api/v1/updateTask/:id", async (req, res) => {
  const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) })
  if (!task) {
    res.status(201).json({ message: "No task of that ID" })
    return
  }

  taskRepository.merge(task, req.body);
  await taskRepository.save(task)
  res.json(task);
})

//deleting a task
app.delete("/api/v1/deleteTask/:id", async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    const task = await taskRepository.findOneBy({ id: taskId });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return
    }

    await taskRepository.remove(task);

    res.status(200).json({ message: `Task with ID ${taskId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error});
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(5000, () => {
      console.log(`The app is running on port 5000`)
    })
  })
  .catch((error) => console.error("❌ Database connection error:", error));

