import * as React from "react";
import ToDoHeader from "./LocalComponents/ToDoHeader";
import ToDoItem from "./LocalComponents/ToDoItem";
import AddToDoItem from "./LocalComponents/AddToDoItem";
import Modal from "../../components/Modal";
import { css } from "glamor";

const modalStyle = css({
  position: "relative",
  display: "block",

  "& h2, & h3, p": {
    textAlign: "center"
  },

  "& h2": {
    position: "relative",
    padding: "0 35px",
    margin: "0",
    fontSize: "25px",
    fontWeight: "600",
    color: "#223c54"
  },

  "& h3": {
    position: "relative",
    margin: "10px 0 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#D1D0D0"
  },

  "& p": {
    position: "relative",
    margin: "20px 0 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#637587"
  },

  "& .uncheck-btn": {
    position: "relative",
    display: "table",
    padding: "6px 10px 5px",
    margin: "10px auto 0",
    borderRadius: 5,
    color: "#f44336",
    backgroundColor: "rgba(244, 67, 54, 0.07)",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",

    "&:hover": {
      backgroundColor: "rgba(244, 67, 54, 0.25)"
    }
  },

  "& .close-button": {
    position: "absolute",
    display: "block",
    zIndex: 1,
    top: 0,
    left: "auto",
    right: 0,
    width: 14,
    height: 14,
    cursor: "pointer",

    "&:before, &:after": {
      content: "''",
      position: "absolute",
      display: "block",
      width: 16,
      height: 2,
      top: 6,
      left: -1,
      backgroundColor: "#8fa5bb",
      transition: "background-color 0.3s ease-in-out",
      transform: "rotate(45deg)"
    },
    "&:after": {
      transform: "rotate(-45deg)"
    },

    "&:hover": {
      "&:before, &:after": {
        backgroundColor: "#223c54"
      }
    }
  }
});

interface ModalItem {
  id: string;
  time: any;
  title: string;
  done: boolean;
  description: string;
}

interface Props {
  todoList: Array<{
    id: string;
    time: any;
    title: string;
    done: boolean;
    description: string;
  }>;
  toggleDone: (id: string, val: boolean) => void;
  deleteItem: (index: number) => void;
  changeScreen: (val: boolean) => void;
  toggleActive: (index: number) => void;
}

interface State {
  isShowed: boolean;
  modalItem: ModalItem;
}

class ViewToDo extends React.Component<Props, State> {
  state = {
    isShowed: false,
    modalItem: undefined
  };

  handleModal = (e: any, val: boolean, item?: ModalItem) => {
    e.preventDefault();

    if (val === true) {
      this.setState({
        modalItem: item
      });
    }

    this.setState({
      isShowed: val
    });

    return null;
  };

  render() {
    const {
      todoList,
      toggleDone,
      deleteItem,
      changeScreen,
      toggleActive
    } = this.props;

    const { modalItem, isShowed } = this.state;
    return (
      <>
        <Modal isShowed={isShowed}>
          <div className={`${modalStyle}`}>
            <span
              className="close-button"
              onClick={e => this.handleModal(e, !isShowed)}
            />
            {modalItem ? (
              <>
                <h2>{modalItem.title}</h2>
                <h3>{modalItem.time}</h3>
                {modalItem.description ? (
                  <p>{modalItem.description}</p>
                ) : (
                  <p>
                    There is no description, you can change this on edit mode!
                  </p>
                )}
                {modalItem.done && (
                  <span
                    className="uncheck-btn"
                    onClick={e => {
                      this.handleModal(e, !isShowed);
                      toggleDone(modalItem.id, false);
                    }}
                  >
                    Uncheck
                  </span>
                )}
              </>
            ) : null}
          </div>
        </Modal>
        <div className="todo-view">
          <div className="scroll-container">
            <ToDoHeader />
            <div className="list-container">
              {todoList && todoList.length > 0 ? (
                todoList.map((item, index) => (
                  <ToDoItem
                    key={item.id}
                    time={item.time}
                    title={item.title}
                    done={item.done}
                    toggleDone={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDone(item.id, true);
                    }}
                    deleteItem={() => deleteItem(index)}
                    toggleActive={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleActive(index);
                    }}
                    onHandleModal={e =>
                      this.handleModal(e, !this.state.isShowed, item)
                    }
                    todoList={todoList}
                  />
                ))
              ) : (
                <span className="empty-list-text">
                  There are no items in todo list. <br />
                  Can you add and make this list more intresting :)
                </span>
              )}
            </div>
          </div>
          <AddToDoItem changeScreen={changeScreen} />
        </div>
      </>
    );
  }
}

export default ViewToDo;
