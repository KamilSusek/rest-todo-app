package io.app.todo;

public class ToDo {


    private String toDo;
    private String dateFrom;
    private String dateTo;

    public ToDo() {
    }

    public ToDo(String toDo, String dateFrom, String dateTo) {
        this.toDo = toDo;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }


    public String getToDo() {
        return toDo;
    }

    public void setToDo(String toDo) {
        this.toDo = toDo;
    }

    public String getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }

    public String getDateTo() {
        return dateTo;
    }

    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }
}
