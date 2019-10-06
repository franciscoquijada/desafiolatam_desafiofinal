import { useState } from 'react';

const useGenericInput = (initialValue = '', type = 'text') => {
    const [value, setValue] = useState(initialValue);
    return {
        onChange: (event) => setValue(event.target.value),
        value,
        type,
    }
}

export default useGenericInput;