import React from "react";
import { v4 as uuid } from "uuid";
import { getTodosData } from "../Redux/Todos/action";
import { useDispatch } from "react"


const initState = {
  title: "",
  description: "",
  subtasks: [],
  status: "",
  tags: { official: false, personal: false, others: false },
  date: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_TITLE":
      return { ...state, title: payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "UPDATE_STATUS":
      return { ...state, status: payload };
    case "UPDATE_TAGS":
      return { ...state, tags: { ...state.tags, ...payload } };
    case "CHANGE_DATE":
      return { ...state, date: payload };
    case "TOGLE_SUBTASK":
      const subtaskAfterToggle = state.subtasks.map((el) =>
        el.id === payload.id ? { ...el, subtaskStatus: payload.status } : el
      );
      return { ...state, subtasks: subtaskAfterToggle };

    case "UPDATE_SUBTASKS":
      return { ...state, subtasks: [...state.subtasks, payload] };
    case "DELETE_SUBTASKS":
      const subtasksAfterDeletion = state.subtasks.filter(
        (el) => el.id !== payload
      );
      return { ...state, subtasks: subtasksAfterDeletion };
    default:
      throw new Error("Please dive proper action object");
  }
};

export const TodosCreate = () => {
    const [state, dispatch] = React.useReducer(reducer, initState);
    const reduxDispatch = useDispatch()
    const [subtaskInputValue, setSubtaskInputValue] = React.useState("");
    const createNewTask = () => {
        const payload = { ...state };

        fetch(`http://localhost:8080/todos`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/json"}
        }).then(() => reduxDispatch(getTodosData()))
    }

  const { title, description, subtasks, status, tags, date } = state;
  const { official, personal, others } = tags;

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) =>
          dispatch({ type: "UPDATE_TITLE", payload: e.target.value })
        }
      />

      <br />
      <br />
      <input
        type="text"
        placeholder="DESCRIPTION"
        value={description}
        onChange={(e) =>
          dispatch({ type: "UPDATE_DESCRIPTION", payload: e.target.value })
        }
      />
      <br />
      <br />
      <div>
        <label>
          <input
            type="radio"
            checked={status === "Todo"}
            onChange={(e) =>
              dispatch({ type: "UPDATE_STATUS", payload: "Todo" })
            }
          />
          Todo
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={status === "InProgress"}
            onChange={(e) =>
              dispatch({ type: "UPDATE_STATUS", payload: "InProgress" })
            }
          />
          In Progres
        </label>
        \
        <br />
        <label>
          <input
            type="radio"
            checked={status === "Done"}
            onChange={(e) =>
              dispatch({ type: "UPDATE_STATUS", payload: "Done" })
            }
          />
          Done
        </label>
        <br />
      </div>

      <br />
      <div>
        <label>
          <input
            type="checkbox"
            checked={official}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TAGS",
                payload: { official: e.target.checked },
              });
            }}
          />
          OFFICIAL
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={personal}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TAGS",
                payload: { personal: e.target.checked },
              });
            }}
          />
          PERSONAL
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={others}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TAGS",
                payload: { others: e.target.checked },
              });
            }}
          />
          OTHERS
        </label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) =>
            dispatch({ type: "CHANGE_DATE", payload: e.target.value })
          }
        />
        <br />
        <br />
        <br />
        <h1>CREATE SUBTASKS</h1>
        <input
          type="text"
          value={subtaskInputValue}
          onChange={(e) => setSubtaskInputValue(e.target.value)}
        />
        <button
          onClick={(e) => {
            const payload = {
              id: uuid(),
              subtaskTitle: subtaskInputValue,
              subtaskStatus: false,
            };

            dispatch({ type: "UPDATE_SUBTASKS", payload });
          }}
        >
          ADD SUBTASK
        </button>
        <div>
          {subtasks.map((subtask) => (
            <div key={subtask.id} style={{ display: "flex" }}>
              <label>
                <input
                  type="checkbox"
                  checked={subtask.subtaskStatus}
                  onChange={(e) =>
                    dispatch({
                      type: "TOGGLE_SUBTASK",
                      payload: { id: subtask.id, status: e.target.checked },
                    })
                  }
                />
                {subtask.subtaskTitle}
              </label>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_SUBTASK", payload: subtask.id })
                }
              >DELETE</button>
            </div>
          ))}
        </div>
          </div>
          <button onClick={createNewTask} >CREATE TASK</button>
    </div>
  );
};
