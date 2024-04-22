import {useState} from 'react'
import classNames from "classnames";

const SampleSplitter = ({
                            id = 'drag-bar', dir, isDragging, ...props
                        }: any) => {
    const [isFocused, setIsFocused] = useState(false)

    return (<div
            id={id}
            data-testid={id}
            tabIndex={0}
            className={classNames('sample-drag-bar', {'sample-drag-bar--horizontal': dir === 'horizontal'}, {'sample-drag-bar--dragging': (isDragging || isFocused)})}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
        />)
}

export default SampleSplitter
