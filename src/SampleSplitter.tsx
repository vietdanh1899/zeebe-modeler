import {useState} from 'react'
import classNames from "classnames";
import styled from "styled-components";

const StyledSplitter = styled.div`
    .sample-drag-bar {
        flex-shrink: 0;
        width: 5px;
        height: 100%;
        background-color: #d1d5db;
        cursor: col-resize;
    }

    .sample-drag-bar.sample-drag-bar--dragging,
    .sample-drag-bar:hover {
        background-color: #63B3ED;
    }

    .sample-drag-bar.sample-drag-bar--horizontal {
        height: 5px;
        width: 100%;
        cursor: row-resize;
    }
`;
const SampleSplitter = ({
                            id = 'drag-bar', dir, isDragging, ...props
                        }: any) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <StyledSplitter>
            <div
                id={id}
                data-testid={id}
                tabIndex={0}
                className={classNames('sample-drag-bar', {'sample-drag-bar--horizontal': dir === 'horizontal'}, {'sample-drag-bar--dragging': (isDragging || isFocused)})}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </StyledSplitter>)
}

export default SampleSplitter
