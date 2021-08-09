import { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss'
TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('')
    function handleChange(event) {
        console.log(event.target.value)
        setValue(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        if(!onSubmit) return;
        const formValues = {
            title: value
        };
        onSubmit(formValues);
        setValue('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={(event)=>handleChange(event)} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default TodoForm;