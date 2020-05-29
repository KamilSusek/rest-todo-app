package io.app.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class ToDoController {

    @Autowired
    private ToDoRepository repo;

    @GetMapping("/get-all")
    public List<ToDo> getAllToDos() {
        return repo.getAllToDos();
    }

    @PostMapping("/add-todo")
    public void addToDo(@RequestBody ToDo todo) {
        repo.addToDo(todo);
    }

    @DeleteMapping("/delete-todo/{id}")
    public List<ToDo> deleteToDoById(@PathVariable int id) {
        return repo.deleteToDoById(id);
    }

    @PutMapping("/update/{id}")
    public List<ToDo> updateById(@RequestBody ToDo todo, @PathVariable int id) {
        return repo.updateToDoById(todo, id);
    }
}
