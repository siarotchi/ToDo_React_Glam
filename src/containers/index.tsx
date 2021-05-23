import * as React from "react";
import ViewToDo from "./ViewToDo";
import CreateToDo from "./CreateToDo";
import uuid from "uuid";

interface todoItemType {
  id: string;
  time: any;
  title: string;
  done: boolean;
  description: string;
}

const ToDoApp = () => {
  const [state, setState] = React.useState({
    createScreen: false,
    todoList: [
      {
        id: uuid.v4(),
        time: "05:30",
        title: "Wake up",
        done: true,
        description: "Today is important day, so I must to wake up earlier"
      },
      {
        id: uuid.v4(),
        time: "07:00",
        title: "Go to work",
        done: false,
        description: "My first day at new job."
      }
    ]
  });

  const [activeIndex, setActiveIndex] = React.useState(undefined);

  React.useEffect(() => {
    if (activeIndex !== undefined) {
      changeScreen(true);
    }
  }, [activeIndex]);

  const addTodoItem = (
    id: string,
    time: any,
    title: string,
    done: boolean,
    description: string
  ) => {
    let arr = state.todoList;

    arr.push({ id, time, title, done, description });

    arr = swampFunc(arr);

    setState({
      ...state,
      todoList: arr
    });

    return null;
  };

  const editTodoItem = (
    index: number,
    time: any,
    title: string,
    description: string
  ) => {
    let arr = state.todoList;

    arr.map((item, i) => {
      if (index === i) {
        item.title = title;
        item.time = time;
        item.description = description;
      }

      return item;
    });

    arr = swampFunc(arr);

    setState({
      ...state,
      todoList: arr
    });

    return null;
  };

  const swampFunc = (arr: Array<todoItemType>) => {
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        continue;
      }
      let a = arr[i - 1];
      let b = arr[i];
      let aArr = a.time.split(":");
      let bArr = b.time.split(":");

      const localSwamp = (A: todoItemType, B: todoItemType) => {
        let swap = undefined;
        swap = A;
        A = B;
        B = swap;

        return { A, B };
      };

      if (Number(aArr[0]) > Number(bArr[0])) {
        let result = localSwamp(a, b);
        arr[i - 1] = result.A;
        arr[i] = result.B;
      } else if (
        Number(aArr[0]) === Number(bArr[0]) &&
        Number(aArr[1]) > Number(bArr[1])
      ) {
        let result = localSwamp(a, b);
        arr[i - 1] = result.A;
        arr[i] = result.B;
      }
    }

    return arr;
  };

  const toggleDone = (id: string, val: boolean) => {
    const arr = state.todoList;
    arr.map(item => id === item.id && (item.done = val));

    setState({
      ...state,
      todoList: arr
    });

    return null;
  };

  const deleteItem = (index: number) => {
    let arr = state.todoList;
    arr = arr.filter((_, i) => index !== i);
    setTimeout(() => {
      setState({
        ...state,
        todoList: arr
      });

      clearTimeout();
    }, 700);

    return null;
  };

  const changeScreen = (val: boolean) => {
    setState({
      ...state,
      createScreen: val
    });

    return null;
  };

  return (
    <div className={`todo-app ${state.createScreen ? "create-screen" : ""}`}>
      <ViewToDo
        todoList={state.todoList}
        toggleDone={toggleDone}
        deleteItem={deleteItem}
        changeScreen={changeScreen}
        toggleActive={setActiveIndex}
      />
      <CreateToDo
        todoList={state.todoList}
        activeIndex={activeIndex}
        changeScreen={changeScreen}
        editTodoItem={editTodoItem}
        addTodoItem={addTodoItem}
        toggleActive={setActiveIndex}
      />
    </div>
  );
};

export default ToDoApp;
