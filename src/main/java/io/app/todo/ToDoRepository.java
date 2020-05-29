package io.app.todo;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ToDoRepository {

    private List<ToDo> todos;

    public ToDoRepository() {
        todos = new ArrayList<>();
        todos.add(new ToDo("Learn Hibernate", "01.02.2020", "01.02.2020"));
        todos.add(new ToDo("Learn Hibernate", "01.02.2020", "01.02.2020"));
        todos.add(new ToDo("Learn Hibernate", "01.02.2020", "01.02.2020"));
    }

    public List<ToDo> getAllToDos() {
        return todos;
    }

    public void addToDo(ToDo todo) {
        todos.add(todo);
    }

    public List<ToDo> deleteToDoById(int id) {
        todos.remove(id);
        return todos;
    }


    public List<ToDo> updateToDoById(ToDo todo, int id) {

        todos.get(id).setToDo(todo.getToDo());
        todos.get(id).setDateFrom(todo.getDateFrom());
        todos.get(id).setDateTo(todo.getDateTo());
        return todos;
    }
}
