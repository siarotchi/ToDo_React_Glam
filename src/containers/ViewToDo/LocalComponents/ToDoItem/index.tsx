import * as React from "react";

interface Props {
  time: string;
  title: string;
  done: boolean;
  toggleDone: (e: any) => void;
  deleteItem: () => void;
  todoList: Array<{
    id: string;
    time: any;
    title: string;
    done: boolean;
    description: string;
  }>;
  toggleActive: (e: any) => void;
  onHandleModal: (e: any) => void;
}

interface State {
  activeSettings: boolean;
  deleted: boolean;
}

class ToDoItem extends React.Component<Props, State> {
  state = {
    activeSettings: false,
    deleted: false
  };

  handleSettingsHover = (value: boolean) =>
    this.setState(prevState => {
      if (prevState.activeSettings !== value) {
        return {
          activeSettings: value
        };
      }

      return null;
    });

  componentDidUpdate(prevProps) {
    if (prevProps.todoList !== this.props.todoList) {
      this.setState({
        deleted: false
      });
    }
  }

  render() {
    const {
      time,
      title,
      done,
      toggleDone,
      deleteItem,
      toggleActive,
      onHandleModal
    } = this.props;
    const { deleted } = this.state;
    return (
      <div
        className={`todo-item ${done ? "done" : ""} ${
          deleted ? "deleted" : ""
        }`}
        onMouseLeave={() => this.handleSettingsHover(false)}
        onClick={onHandleModal}
      >
        <div className="item-info">
          <span className="time">{time}</span>
          <h3 className="title">{title}</h3>
        </div>
        <div
          className={`item-settings ${
            !done ? (this.state.activeSettings ? "active" : "") : "done"
          }`}
        >
          <div
            className="settings-button"
            onMouseEnter={() => this.handleSettingsHover(true)}
          >
            {done && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 426.67 426.67"
                width="18"
                height="18"
              >
                <path
                  fill="#D1D0D0"
                  d="M153.504,366.839c-8.657,0-17.323-3.302-23.927-9.911L9.914,237.265
                c-13.218-13.218-13.218-34.645,0-47.863c13.218-13.218,34.645-13.218,47.863,0l95.727,95.727l215.39-215.386
                c13.218-13.214,34.65-13.218,47.859,0c13.222,13.218,13.222,34.65,0,47.863L177.436,356.928
                C170.827,363.533,162.165,366.839,153.504,366.839z"
                />
              </svg>
            )}
          </div>
          <SettingsItems
            done={done}
            handleSettingsHover={this.handleSettingsHover}
            toggleDone={toggleDone}
            toggleActive={toggleActive}
            deleteItem={() => {
              this.setState({ deleted: true });
              deleteItem();
            }}
          />
        </div>
      </div>
    );
  }
}

export default ToDoItem;

interface SettingsItemsProps {
  done: boolean;
  handleSettingsHover: (value: boolean) => void;
  toggleDone: (e: any) => void;
  deleteItem: () => void;
  toggleActive: (e: any) => void;
}

const SettingsItems = ({
  done,
  toggleDone,
  deleteItem,
  handleSettingsHover,
  toggleActive
}: SettingsItemsProps) => (
  <React.Fragment>
    <span
      className={`settings-icon ${done ? "done" : ""}`}
      onClick={toggleDone}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 426.67 426.67"
        width="18"
        height="18"
      >
        <path
          fill="#3ECEFF"
          d="M153.504,366.839c-8.657,0-17.323-3.302-23.927-9.911L9.914,237.265
          c-13.218-13.218-13.218-34.645,0-47.863c13.218-13.218,34.645-13.218,47.863,0l95.727,95.727l215.39-215.386
          c13.218-13.214,34.65-13.218,47.859,0c13.222,13.218,13.222,34.65,0,47.863L177.436,356.928
          C170.827,363.533,162.165,366.839,153.504,366.839z"
        />
      </svg>
    </span>
    <span className="settings-icon" onClick={toggleActive}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 18"
      >
        <g fill="none" fillRule="nonzero">
          <path
            stroke="#3ECEFF"
            strokeWidth="1.2"
            d="M.6 14.5v2.9h2.901L16.556 4.358a1.4 1.4 0 0 0 0-1.98l-.922-.92a1.4 1.4 0 0 0-1.98-.001L.6 14.499zM2 13l2.984 2.91"
          />
          <path
            fill="#3ECEFF"
            d="M11.624 3.375l2.984 2.91 2.911-2.91L14.61.464"
            opacity=".5"
          />
        </g>
      </svg>
    </span>
    <span
      className="settings-icon"
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        handleSettingsHover(false);
        deleteItem();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="17"
        viewBox="0 0 18 16"
      >
        <g fill="#3ECEFF" fillRule="nonzero">
          <path d="M13.341 15.074L15.66 2.47H2.93l2.313 12.604h8.1zm.414.926H4.829a.484.484 0 0 1-.484-.384L1.861 2.086c-.052-.283.18-.542.484-.542h13.898c.305 0 .536.26.484.542l-2.489 13.53a.484.484 0 0 1-.483.384z" />
          <path d="M.69 2.822c-.262 0-.473-.2-.473-.446s.211-.446.472-.446h16.718c.26 0 .473.2.473.446s-.212.446-.473.446H.689z" />
          <path d="M11.316 0c.091 0 .18.033.246.092l1.948 1.717c.239.21.08.588-.246.588H5.08c-.326 0-.484-.377-.246-.587L6.777.092A.372.372 0 0 1 7.023 0h4.293zm-.142.68H7.166L5.99 1.717h6.362L11.174.679zM8.81 5.744c0-.188.162-.34.361-.34.199 0 .36.152.36.34v7.226c0 .187-.161.34-.36.34-.199 0-.36-.153-.36-.34V5.744zM12.227 5.702a.356.356 0 0 1 .402-.295.344.344 0 0 1 .312.379l-.957 7.226a.356.356 0 0 1-.402.295.344.344 0 0 1-.313-.38l.958-7.225zM5.54 5.786a.344.344 0 0 1 .312-.38.356.356 0 0 1 .402.296l.958 7.226a.344.344 0 0 1-.313.379.356.356 0 0 1-.402-.295L5.54 5.786z" />
          <path d="M9.063 2.283v13.353H4.896L2.375 2.283z" opacity=".3" />
        </g>
      </svg>
    </span>
  </React.Fragment>
);
