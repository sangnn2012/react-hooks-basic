import { useState, useRef } from "react";
import PropTypes from "prop-types";

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(event) {
    const value = event.target.value;
    setSearchTerm(value);
    if (!onSubmit) return;

    console.log(typingTimeoutRef)
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        console.log('after clear: ', typingTimeoutRef)
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  }
  return (
    <form>
      <input type="text" value={searchTerm} onChange={(event) => handleSearchTermChange(event)} />
    </form>
  );
}

export default PostFiltersForm;
