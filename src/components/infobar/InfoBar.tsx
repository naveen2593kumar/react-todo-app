import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { ITodoState } from "../../model/todo-state";
import { AppDispatch, RootState } from "../../redux/store";
import { filterTodo } from "../../redux/todo";
import { countMapper } from "../../util/todo-utils";

import StyledBadge from "../commons/StyledBadge";

import { filters } from "./filter.model";
import classes from "./InfoBar.module.css";

/**
 * this component shows the info bar for todo app
 * containg count (for all todos state) and filter buttons to show todos with respective state
 */
const InfoBar: FC = () => {
    const { todos } = useSelector<RootState>(state => state.todos) as ITodoState;
    const dispatch = useDispatch<AppDispatch>();
    const [filter, setFilter] = useState('All');

    if (!todos || todos.length < 1) return null;

    // To show the count for all states => All, Done, Pending
    const countMap = countMapper(todos);

    const handleFilterChange = (_: React.MouseEvent<HTMLElement, MouseEvent>, newFilter: string) => {
        setFilter(newFilter);
        dispatch(filterTodo(newFilter));
    }

    return (
        <section className={classes.wrapper}>
            <div>
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    size="small"
                    onChange={handleFilterChange}
                    aria-label="TODO Filters">
                    {
                        filters.map(filter => (
                            <ToggleButton
                                data-testid={`filter${filter}ToggleBtn`}
                                key={filter}
                                value={filter}
                                disabled={countMap[filter] < 1}
                                style={{ minWidth: 48 }}
                                aria-label={filter}>
                                <StyledBadge badgeContent={countMap[filter]} color="primary">
                                    {filter}
                                </StyledBadge>
                            </ToggleButton>))
                    }
                </ToggleButtonGroup> </div>

        </section>
    )
}

export default InfoBar;